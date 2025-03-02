# **Log File Processor with IP Extraction & MongoDB Storage**

## **Overview**
This project allows users to upload log files through a React-based frontend, processes the files in the backend using Express and Multer, extracts unique public and private IPs, and stores them in MongoDB. The extracted IPs are then displayed on the frontend.

## **Tech Stack**
- **Frontend:** React, Axios, TailwindCSS
- **Backend:** Node.js, Express, Multer
- **Database:** MongoDB, Mongoose
- **Containerization:** Docker, Docker Compose

## **Features**
✅ Upload log files (.txt, .log, .docx, .xlsx) from frontend  
✅ Extract unique private and public IPs using regex  
✅ Store extracted IPs in MongoDB with efficient bulk insert  
✅ Display extracted IPs on the frontend  
✅ Handles large file uploads without freezing the system  

---

## **Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/pankaj-gitcode/logFileProcessor.git
cd logFileProcessor.git
```

### **2️⃣ Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm create vite@latest
npm install
npm i axios
```

#### **Backend**
```sh
cd ../backend
npm install
npm install express multer nodemon cors path
```

### **3️⃣ Setup `.env` File**
Create a `.env` file in the `backend/` directory and add:
```env
PORT=3000
DB_URL=mongodb://mongodb:27017/mydatabase
```
For Docker, use:
```env
DB_URL=mongodb://mongodb:27017/mydatabase
```

### **4️⃣ Run the Application**
#### **Without Docker**
**Start Backend:**
```sh
cd backend
npm start or npm run index
```
**Start Frontend:**
```sh
cd frontend
npm run dev
```

#### **With Docker** (Recommended)
```sh
docker-compose up --build
or
docker-compose up -f docker-compose.yml -d
```

---

## **Usage**
1. make sure server is up: navigate to [for Backend]=>`http://localhost:3000`
2. For Frontend: `http://localhost:5173` 
3. Select a `.txt`, `.log`, `.docx`, or `.xlsx` file and upload.
4. The system will process the file, extract IPs, and store them in MongoDB.
5. Extracted **private and public IPs** will be displayed on the frontend.

---

## **Project Structure**
```
log-file-processor/
│── backend/
│   ├── controllers/
│   │   ├── fileController.js  # Handles file processing & IP extraction
│   │   ├── ipDB.js  # Handles MongoDB insertions
│   ├── middleware/
│   │   ├── multerMiddleware.js  # Multer file handling
│   ├── models/
│   │   ├── ipModel.js  # Mongoose schema for storing IPs
│   ├── routes/
│   │   ├── routeLogFile.js  # API endpoints
│   ├── db.js  # Database connection
│   ├── index.js  # Main server entry point
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx  # Main upload UI
│   │   ├── App.jsx  # React routing
│
│── docker-compose.yml  # Docker configuration
│── README.md  # Project documentation
```



## **Future Enhancements**
✅ Add real-time progress updates for file processing  
✅ Optimize MongoDB queries for better performance  
✅ Implement authentication for file uploads  
✅ Add support for different file formats  


## **Contributing**
Feel free to fork the repo, submit PRs, or report issues! 🚀


