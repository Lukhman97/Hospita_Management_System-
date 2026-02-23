from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile, sync_role_tables

#user Serializer
class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', "username", "email", "role")

    def get_role(self, obj):
        profile, _ = Profile.objects.get_or_create(user=obj)
        return profile.role


#register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=Profile.ROLE_CHOICES, default=Profile.ROLE_PATIENT)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "role")
        extra_kwargs = {"password" : {"write_only": True}}

    def create(self, validated_data):
        role = validated_data.pop("role", Profile.ROLE_PATIENT)
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"]
        )
        profile, _ = Profile.objects.get_or_create(user=user)
        profile.role = role
        profile.save()
        sync_role_tables(user, role)

        if role in (Profile.ROLE_DOCTOR, Profile.ROLE_ADMIN, Profile.ROLE_STAFF) and not user.is_staff:
            user.is_staff = True
            user.save(update_fields=["is_staff"])

        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    role = serializers.ChoiceField(choices=Profile.ROLE_CHOICES, required=False)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        requested_role = data.get("role")

        user = authenticate(username=username, password=password)
        if not user or not user.is_active:
            raise serializers.ValidationError("Invalid username or password.")

        profile, _ = Profile.objects.get_or_create(user=user)
        if requested_role and profile.role != requested_role:
            raise serializers.ValidationError(
                f"This account is registered as {profile.role}. Please use the correct portal."
            )

        return user
