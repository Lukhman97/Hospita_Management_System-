from .models import Patient
from .serializers import PatientSerializer
from rest_framework import viewsets, mixins
from accounts.permissions import IsDoctor, IsDoctorOrCreateOnly
from django.utils import timezone

# Views for listing all Patients


class PatientGetViewSet(viewsets.ModelViewSet):
    """
    Querying all the fields in patients model and ensuring that only those
    that are authenticated can make changes to this view 
    """
    queryset = Patient.objects.all()
    permission_classes = [IsDoctor]
    serializer_class = PatientSerializer

    def perform_update(self, serializer):
        status = serializer.validated_data.get("status")
        if status in (Patient.STATUS_ACCEPTED, Patient.STATUS_REJECTED):
            serializer.save(
                reviewed_by=self.request.user,
                reviewed_at=timezone.now(),
                treated_by=None if status == Patient.STATUS_REJECTED else serializer.instance.treated_by,
                treated_at=None if status == Patient.STATUS_REJECTED else serializer.instance.treated_at,
            )
            return

        if status == Patient.STATUS_IN_TREATMENT:
            serializer.save(
                reviewed_by=self.request.user,
                reviewed_at=timezone.now()
            )
            return

        if status == Patient.STATUS_TREATED:
            serializer.save(
                reviewed_by=self.request.user,
                reviewed_at=timezone.now(),
                treated_by=self.request.user,
                treated_at=timezone.now()
            )
            return
        serializer.save()


class PostViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Querying all the fields in patients model and ensuring that only those
    that are authenticated can make changes to this view 
    """
    queryset = Patient.objects.all()
    permission_classes = [IsDoctorOrCreateOnly]
    serializer_class = PatientSerializer

    def perform_create(self, serializer):
        serializer.save(
            status=Patient.STATUS_PENDING,
            reviewed_by=None,
            reviewed_at=None
        )
