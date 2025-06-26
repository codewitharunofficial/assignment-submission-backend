// Load the file (must be in same directory or provide full path)
var students = JSON.parse(cat("students.json"));

// Insert into the Students collection
db.Students.insertMany(students);
