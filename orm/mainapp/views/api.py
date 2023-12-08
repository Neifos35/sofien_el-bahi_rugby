from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from ..models.stadium import Stadium
from ..models.event import Event
from ..models.team import Team
from ..models.ticket import Ticket

# Vue pour /api/stadiums/
def get_stadiums(request):
    stadiums = Stadium.objects.all()
    stadium_list = [
        {
            "name": stadium.name,
            "location": stadium.location,
            "latitude": float(stadium.latitude),
            "longitude": float(stadium.longitude)
        }
        for stadium in stadiums
    ]
    return JsonResponse({"stadiums": stadium_list})

# Vue pour /api/events/
def get_events(request):
    events = Event.objects.all()
    event_list = []

    for event in events:
        event_data = {
            "id": event.id,
            "start": event.start.strftime("%Y-%m-%d %H:%M:%S"),
            "team_home_id": None  # Par défaut, définir l'ID de l'équipe à None
        }

        # Vérifier si l'événement a une équipe associée pour le domicile
        if event.team_home:
            event_data["team_home_id"] = event.team_home.id

        event_list.append(event_data)

    return JsonResponse({"events": event_list})

# Vue pour /api/teams/
def get_teams(request):
    teams = Team.objects.all()
    team_list = [
        {
            "id": team.id,
            "country": team.country,
            "country_alpha2": team.country_alpha2,
            "nickname": team.nickname,
            "color_first": team.color_first,
            "color_second": team.color_second
        }
        for team in teams
    ]
    return JsonResponse({"teams": team_list})

# Vue pour /api/ticket/{id}/
def get_ticket(request, id):
    ticket = get_object_or_404(Ticket, id=id)
    ticket_info = {
        "id": ticket.id,
        "event_id": ticket.event.id,
        "category": ticket.category,
        "seat": ticket.seat,
        "price": ticket.price,
        "currency": ticket.currency
    }
    return JsonResponse(ticket_info)


