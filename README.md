# Purpose
The purpose of this project was to practice and get familiar with AWS before taking the data engineer cert exam. The goal was also to create a personal website to use as CV and display achievements for when I would return from a 1 year break in Mexico.
# Infrastructure
The website consists of 2 pages: The default personal website and the store price checker dashboard.
<img width="790" height="692" alt="Untitled Diagram drawio(1)" src="https://github.com/user-attachments/assets/80036a57-82fc-47ac-a20b-c92763a83f5d" />
## Personal website
When searching the link clients submit a GET request to cloudfront to display the page. Upon display a javascript function will send a POST request to API gateway triggering by a (python) lambda function to update the visitor counter stored in DynamoDB. After updating the previous visitor count is returned in the body of the API and dynamically displayed.
## Dashboard
Is displayed as a static website via cloudfront + S3. To load the page a POST request is made via cloudfront.

 
# Python
The lambda function to update the visitor counter in DynamoDB has tests using moto3 for mock AWS infrastructure. These can be found in the tests folder.
# Automation
## Infrastructure as Code (IaC)
All AWS resources used are programmed in Terraform and state is preserved in terraform cloud. 
## CI/CD
Deployment is done automatically through github actions (deploy.yaml). The pipeline runs the tests and upon success will upload the new frontend files to S3 and cloudfront cache will be refreshed.

