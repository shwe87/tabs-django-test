To try the add-on, just drag the tabs-django-test.xpi to your Mozilla Firefox Browser.

1) Clicking the button "List open tabs" will list the open tabs you are browsing.

2) Clicking the button "List tabs and save" will list the open tabs you are browsing and send them to Django server and save them there.

3) Clicking the button "List Bookmarks" will show you a list of all your bookmarks.


Please take in mind that the function "List tabs and save" of the add-on will only work if you do the following:

1) You must have DJango installed.

2) The directory testsite is the django project where the server is implemented.

3) To run the django server, go to the directory DJango/testsite and run

  $ python manage.py runserver 8080
  
  
4) Then click the button add-on's "List and send" button.


Note: You can visit https://docs.djangoproject.com/en/dev/topics/install/ to see how you can install DJango. I've provided
the latest release in the folder DJango (1.5.4; the one I used), so you just have to follow the instructions provided in the website.


P.D: There are still bugs in this code & mozilla team has changed some of their add-on sdk code due to the bugs I faced
when I was "creating" this add-o. So, if you want to check out the add-on without the bugs and you have the addon sdk
installed (lastest release from github) then feel free to run the addon as:
  
  $ cfx -o run
  
This will run the add-on with the changes included and thus adding the new features in the add-on.
