<template>
    <b-container fluid id="container">
        <b-row>
            <img id="img" src="../assets/images/dab.jpg"/>
            <b-col>
               <div id="textContainer"> 
                <p class="text">
                    This website created by Yaar May-Paz and Amit Nachimovitz. 
                    We are 3rd-year students at the Software and System Information Engineering in Ben Gurion University.
                    This website is our final project in the course "Web Development Enviermonts" and its a showcase of what we have learned during the course.
                    To implement this project, we used a stack that includes Node.js for the backend, Vue framework for the frontend, and MSSQL for the database.
                    Our previous projects during that course can be found here:
                </p>
                <a class="text" href="https://sise-web-development-environments.github.io/assignment2-308458470-308294396/">Ms. Pacman</a>
                <br>
                <a class="text" href="https://sise-web-development-environments.github.io/assignment1-308458470/">Yaar May-Paz personal page</a>
                <br>
                <a class="text" href="https://sise-web-development-environments.github.io/assignment1-308294396/">Amit Nachimovitz personal page</a>          
               </div>    
            </b-col>   
        </b-row>   
    </b-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "NanumPenScript";
  src: url("../assets/fonts/NanumPenScript-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}

#textContainer{
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
    margin-top: 30px;
}

.text{  
  font-family: "NanumPenScript";
  font-size: 20pt;  
}

#img{
  margin-top: 40px;
  margin-left: 100px;
  width: 350px;
  height: 100%;
  object-fit: cover;
  display: inline-block;  
  position: relative;
}

</style>