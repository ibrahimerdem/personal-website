from django.http import HttpResponse
from django.template.loader import render_to_string


def home_view(req):
    context = {}
    return HttpResponse(render_to_string('home_view.html', context=context))
