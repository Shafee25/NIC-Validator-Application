**NIC Validator Application**

This is a full-stack web application designed to validate Sri Lankan National Identity Card (NIC) numbers in bulk, extract key demographic information, and present the data through a dashboard and downloadable reports.  
This project was completed as a technical assessment for Mobios Private Ltd.

**Features**

- Secure User Authentication: Full user registration and login system  
- Password Recovery: Complete "Forgot Password" flow via email  
- Bulk NIC Validation: Simultaneous upload and validation of four CSV files  
- Accurate Data Extraction: Decodes NIC numbers to extract date of birth, gender, and age  
  - Supports both old and new NIC formats  
  - Handles leap year calculations  
- Dynamic Dashboard: Interactive summary statistics and gender distribution charts  
- Data Reporting: Download validated data in CSV, Excel, and PDF formats  
- Professional UI/UX: Modern, clean, and responsive React interface  

**Technical Stack**

- Frontend: React.js 
- Backend: PHP (Plain PHP, no framework) 
- Database: MySQL 

**Key Libraries:**
  
- axios → API communication  
- react-router-dom → Page navigation  
- react-chartjs-2 → Data visualization  
- papaparse & xlsx → Client-side report generation  
- PHPMailer → Sending emails  
- TCPDF → PDF generation  

**Architecture**

This application is built using a **Service-Oriented Architecture (SOA)**, following microservice principles:  

- Decoupled Frontend & Backend: React communicates with PHP through REST API  
- Single-Responsibility Endpoints: Modular backend services (User, NIC Processing, Dashboard, Reporting)  
- Security:  
  - password_hash for secure password storage  
  - Prepared SQL statements to prevent SQL injection  


**Setup and Installation**

Prerequisites

- XAMPP or WAMP (Local server environment with Apache + MySQL + PHP)  
- Node.js and npm  
- Composer (for PHP dependencies)  
- A free [Mailtrap.io](https://mailtrap.io/) account for email testing  

**Backend Setup (XAMPP/WAMP)**. Copy the `mobios-api` folder into your web server root directory:  
   - For XAMPP → `C:/xampp/htdocs/`  
   - For WAMP → `C:/wamp/www/`  

**Frontend Setup**

  1.  Navigate to the `frontend` directory in your terminal.
  2.  Run `npm install` to install all dependencies.
  3.  Run `npm start` to launch the application. It will be available at `http://localhost:3000`.

**Diagrams**

The required diagrams (Process Flow, Sequence, and Class) have been created and are included in the `/diagrams` folder within this repository.

