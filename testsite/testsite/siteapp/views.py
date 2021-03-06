# Create your views here.

from django.http import HttpResponse,HttpResponseNotFound
from httplib import HTTPConnection
from testsite.siteapp.models import TabsList
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
#Without csrf_exempt the response sent to the add-on wasn't the desired one by us.
def update(request):
	response = HttpResponse()
	if (request.method == 'PUT'):
		try: 
			TabsList.objects.all().delete()
			#print(len(record))
			p = TabsList(linksList='TABS',links=resource)
			p.save()
			#return HttpResponse('OK')
			response.write('OK')
		except TabsList.DoesNotExist:
			response = HttpResponseNotFound()
			response.write("Page not found")
	else:
		print('GET')
		try:
			allTabs = TabsList.objects.all()
			answer = ""
			for tab in allTabs:
				answer = answer + "<a href = \"" + tab.links + "\">" + tab.linksList + "</a><br>"
			#return HttpResponse(links)
			print ( "ANSWER " + answer)
			response.write(answer)
		except TabsList.DoesNotExist:
			response = HttpResponseNotFound()
			response.write("Page not found")
	print(response)			
	return response

@csrf_exempt
def clear(request,resource):
	response = HttpResponse()
	try:
		TabsList.objects.all().delete()
		response.write('OK')
	except TabsList.DoesNotExist:
		response = HttpResponseNotFound()
		response.write("Not found")
	#response.write(resource)
	print(resource+"\r\n\r\n\r\n")
	return response
	
	
@csrf_exempt	
def save(request,resource):
	data = resource.split("|")
	title = data[0]
	link = data[1]
	print("TITULO " + title)
	print("LINK " + link)
	entry = TabsList(linksList=title,links=link)
	entry.save()
	response = HttpResponse()
	response.write('OK')
	#print(resource+"\r\n\r\n\r\n")
	return response








