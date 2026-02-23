from rest_framework import routers
from .views import PostViewSet, PatientGetViewSet

router = routers.DefaultRouter()
router.register('postpatient', PostViewSet, basename='post-patient')
router.register('getpatient', PatientGetViewSet, basename='get-patient')

urlpatterns = router.urls
