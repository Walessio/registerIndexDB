Assignment has been tested in a node.js webserver
unit tests where written in Karma
E2E tests where written in Protractor
more info about the develop and testing environment can be found here:
https://docs.angularjs.org/tutorial/#environment-setup



assigment specifications from e-mails:


Hello Alessio,

One correction:
3: if there's no data, the websites redirects to a different view (using angular's routing) which shows a registration form with four fields: Name, Lastname, Address, and Date of birth;

You are always redirected to the registration form.

What do you exactly mean by "enterprise level application"? There are many different meanings for this.

This means that you should use correct error handling and use of good development practices. Your code should follow SOLID principles https://en.wikipedia.org/wiki/SOLID_(object-oriented_design). Your code should be reusable, testable, DRY....

Can I use other javascripts libraries besides the one already mentioned or should use only those?

You can use whatever you need to. Just show your best knowledge.  

Should I create a new github repository or can I use the one that exists already?

You can use your old one. No need for new one. 

Best regards!
Boštjan

On Wed, Dec 21, 2016 at 10:03 PM, Alessio Cosolo <alessio.axel@gmail.com> wrote:
Hello Mr. Krajnik,
I want to be sure to understand my assignment correctly, so I wrote down the following guidelines for this one-page website:

1: the website checks if there's data saved in IndexDB;
2: if there's data "Hello (Lastname) (Name)!" is shown in the top left corner, additionally, if birthdate is friday, the page style is set to background-color:green;
3: if there's no data, the websites redirects to a different view (using angular's routing) which shows a registration form with four fields: Name, Lastname, Address, and Date of birth;
4: when the submit button is clicked:
4.A: if the age - computed according to the date of birth - is higher then 21 years, form data is saved in IndexDB together with date of creation (the date and time of the moment when the submit button is clicked);
4.B: if the age is less then 21 years no data is saved;

additionally, providing end-to-end tests, unit tests and using typescript and Angular Material will award extra points to this assignment;

this website must be deployed on GitHub repository to allow you to follow the development;

Please let me know if everything is all right or if something is wrong.

I have some questions:
What do you exactly mean by "enterprise level application"? There are many different meanings for this.
Can I use other javascripts libraries besides the one already mentioned or should use only those?
Should I create a new github repository or can I use the one that exists already?

Thanks in advance for your answers.
Best regards






Assignment is:
 
Create GitHub repository and send URL to krajnik@gmail.com.
Create Angular 1.5.8 website.

Default URL site should redirect you to a registry form.
URL ('/register') is a subsite with input form that has the following inputs:
Name, Lastname, Address, and Date of birth.
Submit button ('Register') should save all the input data with additional date of creation
to indexDB, if the age of the applicant is higher than 21 years.
If indexDB has data, 'Hello, LastName Name!' should appear in the top left corner.
If Date of birth is Friday, the background should change to green.
 
You should create this as Enterprise level application. Use of e2e test, unit tests, TypeScript and Angular Material Design are not required but are preferable.
 
Send an email to krajnik@gmail.com that you are finished. 
