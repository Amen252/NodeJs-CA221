import express from "express";
const app = express();

const PORT = 8000;

app.use(express.json());
//add this line if you to use the 
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Welcome to my Express API");
});

let users = [
  {
    id: 1,
    name: "MAO",
    className: "CA221",
    dapartement: "Computer Application",
  },
  {
    id: 2,
    name: "Ismail",
    className: "CA227",
    dapartement: "Computer Application ",
  },
  {
    id: 3,
    name: "Hodan",
    className: "CA223",
    dapartement: "Computer Application",
  },
  {
    id: 4,
    name: "Cudoon",
    className: "CA221",
    dapartement: "Computer Application",
  },
  {
    id: 5,
    name: "Sadak",
    className: "CA221",
    dapartement: "Computer Application",
  },
  {
    id: 6,
    name: "Sadak",
    className: "CA221",
    dapartement: "Computer Application",
  },
];

//get all users
app.get("/api/users", (req, res) => {
  if (!users) {
    return res.status(404).json({ message: "No users found!" });
  }
  res.json(users);
});



//get single user
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  //check if the user is found
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //Print All users as json formart
  res.json({
    message: "User found Succesfully",
    userInformartion: {
      id: user.id,
      name: user.name,
      className: user.className,
      department: user.dapartement,
    },
  });
});

//Create new User
app.post("/api/users", (req, res) => {
  const { name, className, department } = req.body;
  //check if any feild is missing
  if (!name || !className || !department) {
    res.status(400).json({ message: "All feilds are required!" });
  }

  //Create the new user
  const newUser = {
    //ID waxaa ku xisaabineyna inta tiro ee user aan haysano hadii 5user aan haysano user 6 waxaa la siin doona id:6 and so on
    id: users.length + 1,
    name,
    className,
    department,
  };

  //add the user to the list
  users.push(newUser);

  res.status(201).json({
    message: "User created Succesfully",
    newUser: {
      id: newUser.id,
      name: newUser.name,
      className: newUser.className,
      department: newUser.department,
    },
  });
});

//Update the User
app.put('/api/users/:id', (req,res)=>{
  const id = Number(req.params.id);
  const {name , className, department} = req.body || {};
  
  //find the user 
  const user = users.find((u)=> u.id === id);
  if(!user){
    res.status(404).json({message: "user not found!"});
  };

  //this line if the user provides the name use that if not use the old user name
  user.name = name || user.name;
  user.className = className || user.className;
  user.dapartement = user.dapartement || user.dapartement;
  
  //send the new user 
  res.json({
    message : "User updated Successfully",
    UpdatedUser:{
      name:user.name,
      className:user.className,
      department:user.dapartement
    }
  })
});

//Delete user
app.delete('/api/users/:id', (req,res)=>{
  const id = Number(req.params.id);

  //find the user first
  const user = users.find((u)=> u.id == id);
  
  if(!user){
    return res.status(404).json({message: "user not found!"});
  };

  //Delete the user
  users = users.filter((u)=> u.id !== id);
  res.json({
  message: "User deleted succesfully",
    deletedUser :{
      id:user.id,
      name:user.name,
      className :user.className,
      dapartement : user.dapartement,
    }
  })
});

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
