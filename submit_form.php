<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database_name";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "INSERT INTO medical_history (patient_name, age, gender, height, weight, blood_pressure, oxygen_capacity, ongoing_medicines, previous_medicines, allergies, disease_history, medical_treatments, previous_doctor_comments, diagnosis, permanent_illness)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("siiiiisssssssss", $patientName, $age, $gender, $height, $weight, $bloodPressure, $oxygenCapacity, $ongoingMedicines, $previousMedicines, $allergies, $diseaseHistory, $medicalTreatments, $previousDoctorComments, $diagnosis, $permanentIllness);
$patientName = $_POST['patientName'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$height = $_POST['height'];
$weight = $_POST['weight'];
$bloodPressure = $_POST['bloodPressure'];
$oxygenCapacity = $_POST['oxygenCapacity'];
$ongoingMedicines = implode(", ", $_POST['ongoingMedicine']);
$previousMedicines = implode(", ", $_POST['previousMedicine']); 
$allergies = implode(", ", $_POST['allergies']); 
$diseaseHistory = $_POST['diseaseHistory'];
$medicalTreatments = $_POST['medicalTreatments'];
$previousDoctorComments = $_POST['previousDoctorComments'];
$diagnosis = $_POST['diagnosis'];
$permanentIllness = $_POST['permanentIllness'];

if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$stmt->close();
$conn->close();
?>
