import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import Arrow from './Arrow.png';
import DownArrow from './DownArrow.png';
import Axios from 'axios';

import { Context as AuthContext } from '../../context/Auth';

export default () => {

  const { authUser, setAuthUser } = useContext(AuthContext);
  
  const [currentUser, setCurrentUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    graduationyear: '',
    phone_number: '',
    hometown: '',
    high_school: '',
    biography: '',
    school: '',
    major: '',
    major2: '',
    minor: '',
    primary_industry_interest: '',
    secondary_industry_interest: '',
    cities_of_interest: ''
  });
  
  const [editable, setEditable] = useState({edit: false});
  
  useEffect(() => {
    const getUserInfo = async () => {
      Axios.get("api/user/:username/", { params: { email: authUser.user.email } })
        .then(resp => {
          console.log(resp);
          console.log(resp.data);
          
          setCurrentUser({
            first_name: resp.data.user.firstname,
            last_name: resp.data.user.lastname,
            email: resp.data.user.email,
            graduationyear: resp.data.user.graduationyear,
            phone_number: resp.data.user.phone_number,
            hometown: resp.data.user.hometown,
            high_school: resp.data.user.high_school,
            biography: resp.data.user.biography,
            school: resp.data.user.school,
            major: resp.data.user.major,
            major2: resp.data.user.major2,
            minor: resp.data.user.minor,
            primary_industry_interest: resp.data.user.primary_industry_interest,
            secondary_industry_interest: resp.data.user.secondary_industry_interest,
            cities_of_interest: resp.data.user.cities_of_interest
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
    getUserInfo();
  }, [editable.edit]);
  
  const makeChanges = async () => {
    try {
      const resp = await Axios({
        method: 'POST',
        url: '/api/user/update',
        headers: {
          'Content-Type': 'application/json'
        },
        data: currentUser
      });
      console.log(resp);
      console.log(resp.data);
    } catch (error) {
      console.error(error);
      console.error("Failed to update the user.");
    }
  }
  
  const logoutUser = (event) => {
    event.preventDefault();
    document.cookie = 'x-auth-token= ; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete Axios.defaults.headers.common['x-auth-token'];
    setAuthUser({
      action: 'LOGOUT_USER',
      payload: null
    });
    window.location.reload();
  }
  
  const updateCurrentUser = (event) => {
    setCurrentUser({ ...currentUser, [event.target.name]: event.target.value });
  }
  
  function initEmail()
  {
    return currentUser.email;
  }
      
  function initFirstName()
  {
    return currentUser.first_name;
  }
  
  function initLastName()
  {
    return currentUser.last_name;
  }
  
  function initGradYear()
  {
    return currentUser.graduationyear;
  }
  
  function initBio()
  {
    return currentUser.biography;
  }

  function initPhoneNum()
  {
    return currentUser.phone_number;
  }

  function initHometown()
  {
    return currentUser.hometown;
  }

  function initHighSchool()
  {
    return currentUser.high_school;
  }
      
  function initSchool()
  {
    return currentUser.school;
  }

  function initMajor()
  {
    return currentUser.major;
  }
      
  function initMajorTwo()
  {
    return currentUser.major2;
  }
  
  function initMinor()
  {
    return currentUser.minor;
  }
      
  function initPrimaryIndustry()
  {
    return currentUser.primary_industry_interest;
  }
      
  function initSecondaryIndustry()
  {
    return currentUser.secondary_industry_interest;
  }
      
  function initCities()
  {
    return currentUser.cities_of_interest;
  }

  function bioInput(show)
  {
  					//<!--I handled the biography here, but this should probably be done through back-end interfacing with the database-->
  					if(show)
            {
  							document.getElementById("textBox").value=biography;
  							document.getElementById("bioForm").style.display="block";
  							document.getElementById("editButton").style.display="none";
  							document.getElementById("biography").style.display="none";
            }
  					else
            {
  							var biography=document.getElementById("textBox").value;
  							document.getElementById("biography").innerHTML=biography;
  							document.getElementById("bioForm").style.display="none";
  							document.getElementById("editButton").style.display="inline";
  							document.getElementById("biography").style.display="block";
            }
  }
  
  //if true, return becomes editable version. If false, return is static.
  function edit()
  {
      return editable.edit
  }
  
  function refresh()
  {
      if (editable.edit === true) {
          makeChanges();
      }
      
      var change = !editable.edit;
      setEditable({edit: change});
  }
  
  if(!edit())
  {
    return (
      <div id="header">
      <style>{'body { background-color: #00a651; }'}</style>
      		<div id="fullContainer" className="w-75 text-white">
      			<div>
              <h1><b>Student Profile</b> <img src={Arrow} alt="Arrow"/>
              <button type="button" id="edit" onClick={refresh}>edit</button></h1>
            </div>

      				<div id="profile">
      					<h3>Personal Information</h3>
      						<div id="personalInfo">
      							<div><b><label htmlFor="email">Email:&nbsp;</label></b><span id="email">{initEmail()}</span></div>

      							<div><b><label htmlFor="firstName">First Name:&nbsp;</label></b><span id="firstName">{initFirstName()}</span></div>

      							<div><b><label htmlFor="lastName">Last Name:&nbsp;</label></b><span id="lastName">{initLastName()}</span></div>

      							<div><b><label htmlFor="phoneNum">Primary Contact Number:&nbsp;</label></b><span id="phoneNum">{initPhoneNum()}</span></div>

      							<div><b><label htmlFor="hometown">Hometown:&nbsp;</label></b><span id="hometown">{initHometown()}</span></div>

      							<div><b><label htmlFor="highSchool">High School:&nbsp;</label></b><span id="highSchool">{initHighSchool()}</span></div>
      						</div>
      					<h3>Academic Information</h3>
      						<div id="academicInfo">
      							<div><b><label htmlFor="school">School:&nbsp;</label></b><span id="school">{initSchool()}</span></div>

      							<div><b><label htmlFor="gradYear">Graduation Year:&nbsp;</label></b><span id="gradYear">{initGradYear()}</span></div>

      							<div><b><label htmlFor="major">Major:&nbsp;</label></b><span id="major">{initMajor()}</span></div>

      							<div><b><label htmlFor="majorTwo">2nd Major:&nbsp;</label></b><span id="majorTwo">{initMajorTwo()}</span></div>

      							<div><b><label htmlFor="minor">Minor or Concentration:&nbsp;</label></b><span id="minor">{initMinor()}</span></div>
      						</div>
      					<h3>Industry Information</h3>
      						<div id="industryInfo">
      							<div><b><label htmlFor="primaryIndustry">Primary Industry Interest:&nbsp;</label></b><span id="primaryIndustry">{initPrimaryIndustry()}</span></div>

      							<div><b><label htmlFor="secondaryIndustry">Secondary Industry Interest:&nbsp;</label></b><span id="secondaryIndustry">{initSecondaryIndustry()}</span></div>

      							<div><b><label htmlFor="cities">Particular Cities of Interest:&nbsp;</label></b><span id="cities">{initCities()}</span></div>
      						</div>
      					<h3>Biography Information</h3>
      						<label htmlFor="biography">Biography&nbsp;</label><img src={DownArrow} alt="DownArrow"/>
      						<div><h4><p id='biography'>{initBio()}</p></h4></div>
      			</div>
            <button id="logout" onClick={logoutUser}>Logout</button>
      		</div>
        </div>
    );
  }else
  {
    return (
      <div id="header">
      <style>{'body { background-color: #00a651; }'}</style>
      		<div id="fullContainer" className="w-75 text-white">
      			<h1><b>Student Profile</b> <img src={Arrow} alt="Arrow"/></h1>
      				<div id="profile">
      					<h3>Personal Information</h3>
      						<div id="personalInfo">
      							<div><b><label htmlFor="email">Email:&nbsp;</label></b><span id="email">{initEmail()}</span></div>

      							<div><b><label htmlFor="firstName">First Name:&nbsp;</label></b><span id="firstName">{initFirstName()}</span></div>

      							<div><b><label htmlFor="lastName">Last Name:&nbsp;</label></b><span id="lastName">{initLastName()}</span></div>

      							<div><b><label htmlFor="phoneNum">Primary Contact Number:&nbsp;</label></b></div>
      							<div id="phoneForm" className="form-group">
      								<input id="phoneBox" type="phone_number" name="phone_number" className="form-control" value={initPhoneNum()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="hometown">Hometown:&nbsp;</label></b></div>
      							<div id="hometownForm" className="form-group">
      								<input id="hometownBox" type="hometown" name="hometown" className="form-control" value={initHometown()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="highSchool">High School:&nbsp;</label></b></div>
      							<div id="highSchoolForm" className="form-group">
      								<input id="highSchoolBox" type="high_school" name="high_school" className="form-control" value={initHighSchool()} onChange={updateCurrentUser}/>
      							</div>
      						</div>
      					<h3>Academic Information</h3>
      						<div id="academicInfo">
      							<div><b><label htmlFor="school">School:&nbsp;</label></b></div>
      							<div id="schoolForm" className="form-group">
      								<input id="schoolBox" type="school" name="school" className="form-control" value={initSchool()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="gradYear">Graduation Year:&nbsp;</label></b></div>
      							<div id="gradYearForm" className="form-group">
      								<input id="gradYearBox" type="graduationyear" name="graduationyear" className="form-control" value={initGradYear()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="major">Major:&nbsp;</label></b></div>
      							<div id="majorForm" className="form-group">
      								<input id="majorBox" type="major" name="major" className="form-control" value={initMajor()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="majorTwo">2nd Major:&nbsp;</label></b></div>
      							<div id="majorTwoForm" className="form-group">
      								<input id="majorTwoBox" type="major2" name="major2" className="form-control" value={initMajorTwo()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="minor">Minor or Concentration:&nbsp;</label></b></div>
      							<div id="minorForm" className="form-group">
      								<input id="minorBox" type="minor" name="minor" className="form-control" value={initMinor()} onChange={updateCurrentUser}/>
      							</div>
      						</div>
      					<h3>Industry Information</h3>
      						<div id="industryInfo">
      							<div><b><label htmlFor="primaryIndustry">Primary Industry Interest:&nbsp;</label></b></div>
      							<div id="primaryIndustryForm" className="form-group">
      								<input id="primaryIndustryBox" type="primary_industry_interest" name="primary_industry_interest" className="form-control" value={initPrimaryIndustry()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="secondaryIndustry">Secondary Industry Interest:&nbsp;</label></b></div>
      							<div id="secondaryIndustryForm" className="form-group">
      								<input id="secondaryIndustryBox" type="secondary_industry_interest" name="secondary_industry_interest" className="form-control" value={initSecondaryIndustry()} onChange={updateCurrentUser}/>
      							</div>

      							<div><b><label htmlFor="cities">Particular Cities of Interest:&nbsp;</label></b></div>
      							<div id="citiesForm" className="form-group">
      								<input id="citiesBox" type="cities_of_interest" name="cities_of_interest" className="form-control" value={initCities()} onChange={updateCurrentUser}/>
      							</div>
      						</div>
      					<h3>Biography Information</h3>
      						<label htmlFor="biography">Biography&nbsp;</label><img src={DownArrow} alt="DownArrow"/>
                  <div id="bio" className="form-group">
                    <textarea id="bioBox" type="biography" name="biography" className="form-control" rows="8" value={initBio()} onChange={updateCurrentUser}/>
                  </div>
      			</div>
            <div>
              <button type="button" id="edit" onClick={refresh}>Save Edits</button>
            </div>
            <div>
              <button id="logout" onClick={logoutUser}>Logout</button>
            </div>
      		</div>
        </div>
    );
  }
}
