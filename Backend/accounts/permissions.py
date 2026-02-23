from rest_framework.permissions import BasePermission


class IsDoctor(BasePermission):
    message = "Only doctors or admins can access this endpoint."

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        profile = getattr(user, "profile", None)
        if profile is None:
            return False

        return profile.role in {"doctor", "admin"}


class IsDoctorOrCreateOnly(BasePermission):
    message = "Only doctors/admins can view full records. Public users can only submit new entries."

    def has_permission(self, request, view):
        if request.method == "POST":
            return True

        user = request.user
        if not user or not user.is_authenticated:
            return False

        profile = getattr(user, "profile", None)
        return bool(profile and profile.role in {"doctor", "admin"})


class IsDoctorOrStaffCreateOnly(BasePermission):
    message = "Doctors/Admins can view full staff records. Staff can submit details."

    def has_permission(self, request, view):
        user = request.user

        if request.method == "POST":
            if not user or not user.is_authenticated:
                return False
            profile = getattr(user, "profile", None)
            return bool(profile and profile.role in {"doctor", "admin", "staff"})

        if not user or not user.is_authenticated:
            return False

        profile = getattr(user, "profile", None)
        return bool(profile and profile.role in {"doctor", "admin"})


class IsDoctorOrStaffReadOnly(BasePermission):
    message = "Doctors/Admins can modify records. Staff can view only."

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        profile = getattr(user, "profile", None)
        if not profile:
            return False

        if profile.role in {"doctor", "admin"}:
            return True

        if profile.role == "staff":
            return request.method in {"GET", "HEAD", "OPTIONS"}

        return False
