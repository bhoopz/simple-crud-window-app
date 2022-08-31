import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Grid, Typography, TextField, FormControlLabel, Checkbox, MenuItem } from "@material-ui/core"
import FormGroup from '@mui/material/FormGroup';
import { Button, Table, message } from 'antd';
import 'antd/dist/antd.css';
import {DeleteOutlined, EditOutlined, StopOutlined} from '@ant-design/icons'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Cookies from "universal-cookie";
import mainWindow from'../window.jpg';

function Home() {

    const [data, setData] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [priceValid, setPriceValid] = useState(true);
    const [sizeValid, setSizeValid] = useState(true);
    const [priceError, setPriceError] = useState('');
    const [sizeError, setSizeError] = useState('');
    const [query, setQuery] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameError, setUsernameError] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const cookies = new Cookies();

    
    message.config({
        top: 150,
      });


    const fetchWindows = async () => {
        const res = await axios.get(`https://afternoon-cove-89157.herokuapp.com/?q=${query}`);
        setData(res.data);
    }

    useEffect(() =>{
        
        fetchWindows();
      }, [query])

      useEffect(() =>{
        setType(selectedRow?.type);
        setSize(selectedRow?.size);
        setMaterial(selectedRow?.material);
        setColor(selectedRow?.color);
        setPrice(selectedRow?.price);
      },[selectedRow])

      useEffect(() =>{
        setIsLogged(cookies.get("ISLOGGED"));
        setIsAdmin(cookies.get("ISADMIN"))
      }, [])


      const columns = [
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: 'Material',
          dataIndex: 'material',
          key: 'material',
          filters: [
            {
              text: 'UPVC',
              value: 'UPVC',
            },
            {
              text: 'Wood',
              value: 'Wood',
            },
            {
                text: 'Aluminum',
                value: 'Aluminum',
            },
            {
                text: 'Other',
                value: 'Other',
            },
          ],
          onFilter: (value, record) => record.material.indexOf(value) === 0,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Price $',
            dataIndex: 'price',
            key: 'price',
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 2,
              },
        },
        { 
            title: "Edit / Delete", 
            key: "action", 
            render: (record) => { 
            return ( 
            <> 
            <div className="flex"> 
                <EditOutlined 
                    style={{ color: "blue"}} 
                    onClick={() => Edit(record)} 
                /> 
                {(isAdmin == "true" || isAdmin == true) ? 
                <DeleteOutlined 
                style={{ color: "red", marginLeft: "20%" }} 
                onClick={() => Delete(record)} 
                /> : <StopOutlined style={{ marginLeft: "20%" }} />
                }
                
            </div> 
            </> 
            ); 
            }, 
        }
      ];

      const Delete = (record) => { 
        setOpenDeleteDialog(true);
        setSelectedRow(record);
      }

      function deleteRecord(id){
        setOpenDeleteDialog(false)
        axios.delete(`https://afternoon-cove-89157.herokuapp.com/window/${id}`)
        .then(() => fetchWindows(), message.success("Deleted"))
        .catch(() => message.error("Something went wrong"));
      }

      const Edit = (record) => { 
        setOpenEditDialog(true);
        setSelectedRow(record);
      }

      function editRecord(id){
        const priceRegex = new RegExp('^[0-9]+(\.[0-9]{2})?$');
        const sizeRegex = new RegExp('([0-9]+[\\s]X[\\s][0-9]+$)')
  
        if(priceRegex.test(price) && sizeRegex.test(size)){
            setOpenEditDialog(false);
            axios.put(`https://afternoon-cove-89157.herokuapp.com/window/${id}`,{
                type: type,
                size: size,
                material: material,
                color: color,
                price: price
            })
            .then(() => fetchWindows(), message.success("Updated"))
           .catch(() => message.error("Something went wrong"));
        }
        if(!priceRegex.test(price)){
            setPriceValid(false)
            setPriceError('Please enter a valid price *.__')
        } else {
            setPriceValid(true)
            setPriceError('')
        }
        if(!sizeRegex.test(size)){
            setSizeValid(false)
            setSizeError('Please enter a valid size * X *')
        } else {
            setSizeValid(true)
            setSizeError('')
        }   
      }

      function addRecord(){
        const priceRegex = new RegExp('^[0-9]+(\.[0-9]{2})?$')
        const sizeRegex = new RegExp('([0-9]+[\\s]X[\\s][0-9]+$)')
  
        if(priceRegex.test(price) && sizeRegex.test(size)){
            setOpenAddDialog(false);
            axios.post('https://afternoon-cove-89157.herokuapp.com/window/add',{
                type: type,
                size: size,
                material: material,
                color: color,
                price: price
            })
            .then(() => fetchWindows(), message.success("Added"))
            .catch(() => message.error("Something went wrong"));
        }
        if(!priceRegex.test(price)){
            setPriceValid(false)
            setPriceError('Please enter a valid price *.__')
        } else {
            setPriceValid(true)
            setPriceError('')
        }
        if(!sizeRegex.test(size)){
            setSizeValid(false)
            setSizeError('Please enter a valid size * X *')
        } else {
            setSizeValid(true)
            setSizeError('')
        }
      }

      function handleRegistration(){
        const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')
        const passwordRegex = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')

        if(username.length > 4 && emailRegex.test(email) && passwordRegex.test(password) && password == confirmPassword){
            axios.post('https://afternoon-cove-89157.herokuapp.com/register',{
                username: username,
                email: email,
                password: password,
                admin: admin
            })
            .then(() => {
                setOpenRegisterDialog(false);
                setErrorMessage('')
                message.success("Successfully registered")
            })
            .catch((error) => setErrorMessage(error.response.data.message, username));
        }
        if(username.length < 5){
            setUsernameValid(false)
            setUsernameError('Username should have at least 5 characters')
        } else {
            setUsernameValid(true)
            setUsernameError('')
        }
        if(!emailRegex.test(email)){
            setEmailValid(false)
            setEmailError('Invalid email')
        } else {
            setEmailValid(true)
            setEmailError('')
        }
        if(!passwordRegex.test(password)){
            setPasswordValid(false)
            setPasswordError('Password should have minimum six characters, at least one letter and one number')
        } else {
            setPasswordValid(true)
            setPasswordError('')
        }
        if(password != confirmPassword){
            setConfirmPasswordValid(false)
            setConfirmPasswordError('Passwords do not match')
        } else {
            setConfirmPasswordValid(true)
            setConfirmPasswordError('')
        }
      }

    function handleLogin(){
        axios.post('https://afternoon-cove-89157.herokuapp.com/login',{
            username: username,
            password: password
          }).then(response => {
            setOpenLoginDialog(false)
            setIsLogged(response.data.isLogged)
            setIsAdmin(response.data.isAdmin)
            cookies.set("ISLOGGED", response.data.isLogged)
            cookies.set("ISADMIN", response.data.isAdmin)
          }).catch(error => setErrorMessage(error.response.data.message))
    }
    
    function handleLogout(){
        cookies.remove("ISLOGGED");
        cookies.remove("ISADMIN");
        setIsLogged(false)
        setIsAdmin(false);
    }

  return (
    <Grid container spacing={2} align="center">

        <Grid item xs={12}>
            <Typography component="h4" variant="h4">
                    Window Panel
            </Typography>
            <div>
            <img style={{width: "35%"}} src={mainWindow} alt="XD"/>
            </div>
            {isLogged ? 
            <>
            <div>
                <Button style={{ width: '20%'}} type="primary" danger onClick={() => handleLogout()}>Logout</Button>
            </div>
            
            <TextField 
            style={{marginRight: '85%'}}
            variant="outlined"
            label="Search..."
            onChange={(e) => setQuery(e.target.value)}
            />
            <Table columns={columns} dataSource={data}/>
            <Button type="primary" disabled={isAdmin == "false" || !isAdmin} onClick={() => setOpenAddDialog(true)}>Add window</Button>
            </> : <>
            <div>
                <div style={{fontSize: "1.5vw"}}><b>Log in to manage the window panel</b></div>
            <Button style={{ width: '20%', marginTop: '1%'}} type="primary" onClick={() => setOpenLoginDialog(true)}>
                Login
            </Button>
            </div>
            <div style={{fontSize: "1.5vw"}}><b>Or</b></div>
            <Button style={{ width: '20%'}} type="danger" onClick={() => setOpenRegisterDialog(true)}>
                Register
            </Button>
            <div style={{fontSize: "1.5vw", marginTop: '1%'}}><b>if you don't have account</b></div>
            </>}

            <Dialog
            open={openLoginDialog}
            onClose={() => {
                setOpenLoginDialog(false)
                setErrorMessage("")
            }} 
            >
                <DialogContent>
                    {<h2>Login</h2>}
                    
                    <TextField
                    autoFocus
                    label="Username"
                    variant="outlined"
                    required={true}
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    style={{marginTop: '2%'}}
                    label="Password"
                    type="password"
                    variant="outlined"
                    required={true}
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                />
                {<h3 style={{color: 'red'}}>{errorMessage}</h3>}
                    <DialogActions>
                        <Button type="primary" danger onClick={() => {
                            setOpenLoginDialog(false)
                            setErrorMessage("")
                            }}>Cancel</Button>
                        <Button type="primary" onClick={() => handleLogin()}>Log in</Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>

            <Dialog
            open={openRegisterDialog}
            onClose={() => {
                setOpenRegisterDialog(false)
                setErrorMessage("")
            }} 
            >
                <DialogContent>
                    {<h2>Register</h2>}
                    {<h3 style={{color: 'red'}}>{errorMessage}</h3>}
                    <TextField
                    autoFocus
                    label="Username"
                    variant="outlined"
                    required={true}
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                    error={!usernameValid}
                    helperText={usernameError}
                />
                <TextField
                    style={{marginTop: '2%'}}
                    label="Email"
                    variant="outlined"
                    required={true}
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    error={!emailValid}
                    helperText={emailError}
                />
                <TextField
                    style={{marginTop: '2%'}}
                    label="Password"
                    type="password"
                    variant="outlined"
                    required={true}
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    error={!passwordValid}
                    helperText={passwordError}
                />
                <TextField
                    style={{marginTop: '2%'}}
                    label="Confirm password"
                    type="password"
                    variant="outlined"
                    required={true}
                    fullWidth
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!confirmPasswordValid}
                    helperText={confirmPasswordError}
                />
                <FormGroup>
                        <FormControlLabel onChange={() => setAdmin(!admin)} control={<Checkbox color="primary"/>} label="Admin" />
                </FormGroup>
                    <DialogActions>
                        <Button type="primary" danger onClick={() => {
                            setOpenRegisterDialog(false)
                            setErrorMessage("")
                            }}>Cancel</Button>
                        <Button type="primary" onClick={() => handleRegistration()}>Sing up</Button>
                    </DialogActions>
                </DialogContent>

            </Dialog>

        </Grid>

        <Grid item xs={12}>
        <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)} 
        >
            <DialogContent>
                {<h2>Are you sure to delete this record?</h2>}
                <DialogActions>
                    <Button type="primary" onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button type="primary" danger onClick={() => deleteRecord(selectedRow._id)}>Yes</Button>
                </DialogActions>
            </DialogContent>

        </Dialog>
        <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)} 
        >
            <DialogContent>
                {<h2>Edit window</h2>}
                <TextField
                    autoFocus
                    label="Type"
                    defaultValue={selectedRow?.type}
                    required={true}
                    fullWidth
                    onChange={(e) => setType(e.target.value)}
                />
                <TextField
                    label="Size"
                    defaultValue={selectedRow?.size}
                    required={true}
                    fullWidth
                    onChange={(e) => setSize(e.target.value)}
                    error={!sizeValid}
                    helperText={sizeError}
                />
                <TextField
                    select
                    label="Material"
                    defaultValue={selectedRow?.material}
                    required={true}
                    fullWidth
                    onChange={(e) => setMaterial(e.target.value)}
                    >
                        <MenuItem value={'UPVC'}>UPVC</MenuItem>
                        <MenuItem value={'Wood'}>Wood</MenuItem>
                        <MenuItem value={'Aluminum'}>Aluminum</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                </TextField>
                <TextField
                    label="Color"
                    defaultValue={selectedRow?.color}
                    required={true}
                    fullWidth
                    onChange={(e) => setColor(e.target.value)}
                />
                <TextField
                    label="Price $"
                    defaultValue={selectedRow?.price}
                    required={true}
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
                    error={!priceValid}
                    helperText={priceError}
                />
                <DialogActions>
                    <Button type="primary" danger onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button type="primary" onClick={() => editRecord(selectedRow._id)}>Save</Button>
                </DialogActions>
            </DialogContent>

        </Dialog>
        <Dialog
            open={openAddDialog}
            onClose={() => setOpenAddDialog(false)} 
        >
            <DialogContent>
                {<h2>Add new window</h2>}
                <TextField
                    autoFocus
                    label="Type"
                    required={true}
                    fullWidth
                    onChange={(e) => setType(e.target.value)}
                />
                <TextField
                    label="Size"
                    required={true}
                    fullWidth
                    onChange={(e) => setSize(e.target.value)}
                    error={!sizeValid}
                    helperText={sizeError}
                />
                <TextField
                    select
                    label="Material"
                    required={true}
                    defaultValue={''}
                    fullWidth
                    onChange={(e) => setMaterial(e.target.value)}
                    >
                        <MenuItem value={'UPVC'}>UPVC</MenuItem>
                        <MenuItem value={'Wood'}>Wood</MenuItem>
                        <MenuItem value={'Aluminum'}>Aluminum</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                </TextField>
                <TextField
                    label="Color"
                    required={true}
                    fullWidth
                    onChange={(e) => setColor(e.target.value)}
                />
                <TextField
                    label="Price $"
                    required={true}
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
                    error={!priceValid}
                    helperText={priceError}
                />
                <DialogActions>
                    <Button type="primary" danger onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button type="primary" onClick={() => addRecord()}>Add window</Button>
                </DialogActions>
            </DialogContent>

        </Dialog>

        

        
        </Grid>
    </Grid>
  )
}

export default Home;
