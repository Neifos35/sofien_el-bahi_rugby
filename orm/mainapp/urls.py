from django.urls import path
from django.contrib import admin
from .views import (
    HomeView,
    StadiumsView,
    TeamsView,
    NewsletterView,
    UpdateView,
    AboutView,
    get_stadiums,  # Importez la vue get_stadiums depuis le dossier views.api
    get_events,    # Importez la vue get_events depuis le dossier views.api
    get_teams,     # Importez la vue get_teams depuis le dossier views.api
    get_ticket     # Importez la vue get_ticket depuis le dossier views.api
)

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("stadiums", StadiumsView.as_view(), name="stadiums"),
    path("teams", TeamsView.as_view(), name="teams"),
    path("newsletter", NewsletterView.as_view(), name="newsletter"),
    path("about", AboutView.as_view(), name="about"),
    path("update", UpdateView.as_view(), name="update"),
    path("admin", admin.site.urls),
    # Associez les URL aux vues d'API depuis le dossier views.api
    path("api/stadiums/", get_stadiums, name="api_stadiums"),
    path("api/events/", get_events, name="api_events"),
    path("api/teams/", get_teams, name="api_teams"),
    path("api/ticket/<uuid:id>/", get_ticket, name="api_ticket"),
]