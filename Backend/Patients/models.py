from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    STATUS_PENDING = "pending"
    STATUS_ACCEPTED = "accepted"
    STATUS_IN_TREATMENT = "in_treatment"
    STATUS_TREATED = "treated"
    STATUS_REJECTED = "rejected"
    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_ACCEPTED, "Accepted"),
        (STATUS_IN_TREATMENT, "In Treatment"),
        (STATUS_TREATED, "Treated"),
        (STATUS_REJECTED, "Rejected"),
    )

    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False, null=False)
    address = models.CharField(max_length=250,  blank=False, null=False)
    email = models.EmailField( blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=False, null=False)
    next_of_kin = models.CharField(max_length=100,  blank=False, null=False)
    phone_number_next_of_kin = models.CharField(max_length=20, blank=False, null=False)
    message = models.TextField( blank=False, null=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    reviewed_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    reviewed_at = models.DateTimeField(blank=True, null=True)
    treatment_notes = models.TextField(blank=True, null=True)
    treated_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL, related_name="treated_patients")
    treated_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.status})"
