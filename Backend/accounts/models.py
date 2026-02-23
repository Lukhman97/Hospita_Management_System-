from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    ROLE_ADMIN = "admin"
    ROLE_DOCTOR = "doctor"
    ROLE_STAFF = "staff"
    ROLE_PATIENT = "patient"
    ROLE_CHOICES = (
        (ROLE_ADMIN, "Admin"),
        (ROLE_DOCTOR, "Doctor"),
        (ROLE_STAFF, "Staff"),
        (ROLE_PATIENT, "Patient"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_PATIENT)

    def __str__(self):
        return f"{self.user.username} ({self.role})"


class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="doctor_profile")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Doctor: {self.user.username}"


class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="admin_profile")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Admin: {self.user.username}"


class StaffProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="staff_profile")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Staff: {self.user.username}"


def sync_role_tables(user, role):
    if role == Profile.ROLE_DOCTOR:
        DoctorProfile.objects.get_or_create(user=user)
        AdminProfile.objects.filter(user=user).delete()
        StaffProfile.objects.filter(user=user).delete()
    elif role == Profile.ROLE_ADMIN:
        AdminProfile.objects.get_or_create(user=user)
        DoctorProfile.objects.filter(user=user).delete()
        StaffProfile.objects.filter(user=user).delete()
    elif role == Profile.ROLE_STAFF:
        StaffProfile.objects.get_or_create(user=user)
        DoctorProfile.objects.filter(user=user).delete()
        AdminProfile.objects.filter(user=user).delete()
    else:
        DoctorProfile.objects.filter(user=user).delete()
        AdminProfile.objects.filter(user=user).delete()
        StaffProfile.objects.filter(user=user).delete()


@receiver(post_save, sender=User)
def create_profile_for_user(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=Profile)
def sync_role_tables_on_profile_change(sender, instance, **kwargs):
    sync_role_tables(instance.user, instance.role)
