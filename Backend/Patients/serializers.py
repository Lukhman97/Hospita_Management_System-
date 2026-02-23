from rest_framework import serializers
from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    reviewed_by_username = serializers.SerializerMethodField()
    treated_by_username = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = "__all__"
        read_only_fields = ("reviewed_by", "reviewed_at", "treated_by", "treated_at")

    def get_reviewed_by_username(self, obj):
        return obj.reviewed_by.username if obj.reviewed_by else None

    def get_treated_by_username(self, obj):
        return obj.treated_by.username if obj.treated_by else None
