from .models import Expense, Staff, Department, Payroll, Message
from .serializers import ExpenseSerializer, StaffSerializer, DepartmentSerializer, PayrollSerializer, MessageSerializer
from rest_framework import viewsets
from accounts.permissions import IsDoctor, IsDoctorOrCreateOnly, IsDoctorOrStaffCreateOnly, IsDoctorOrStaffReadOnly


DEFAULT_DEPARTMENTS = [
    {
        "Name": "General Medicine",
        "Staff_strength": 0,
        "Head_of_department": "TBD",
        "Income_generated": 0,
        "Expenses": 0,
        "Duration": "JANUARY_JUNE",
        "Function": "Primary diagnostics and non-surgical treatment services.",
    },
    {
        "Name": "Surgery",
        "Staff_strength": 0,
        "Head_of_department": "TBD",
        "Income_generated": 0,
        "Expenses": 0,
        "Duration": "JANUARY_JUNE",
        "Function": "Surgical care, perioperative services, and emergency operations.",
    },
    {
        "Name": "Nursing",
        "Staff_strength": 0,
        "Head_of_department": "TBD",
        "Income_generated": 0,
        "Expenses": 0,
        "Duration": "JANUARY_JUNE",
        "Function": "Inpatient and outpatient nursing support across all units.",
    },
    {
        "Name": "Laboratory",
        "Staff_strength": 0,
        "Head_of_department": "TBD",
        "Income_generated": 0,
        "Expenses": 0,
        "Duration": "JANUARY_JUNE",
        "Function": "Diagnostics, pathology, and medical testing services.",
    },
    {
        "Name": "Pharmacy",
        "Staff_strength": 0,
        "Head_of_department": "TBD",
        "Income_generated": 0,
        "Expenses": 0,
        "Duration": "JANUARY_JUNE",
        "Function": "Medication management, dispensing, and pharmaceutical care.",
    },
]


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsDoctorOrStaffCreateOnly]


class DepartmentViewSet(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = [IsDoctorOrStaffReadOnly]

    def get_queryset(self):
        queryset = Department.objects.all().order_by("Name")

        # Ensure staff can always pick a department in the profile form.
        if not queryset.exists():
            Department.objects.bulk_create([Department(**item) for item in DEFAULT_DEPARTMENTS])
            queryset = Department.objects.all().order_by("Name")

        return queryset


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsDoctor]


class PayrollViewSet(viewsets.ModelViewSet):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer
    permission_classes = [IsDoctor]


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    permission_classes = [IsDoctorOrCreateOnly]
    serializer_class = MessageSerializer
