// mobile number validation 

const USERDBS = require('./../model/user');
const books = require('./../model/books');
const userbook = require('./../model/userbook')
const pdfs = require('./../model/pdf');
const userpdf = require('./../model/userpdf');
const projects = require('./../model/projects')
const userproject = require('./../model/userproject')

function checkNumber(numberMobile)
{
    if(numberMobile.length == 10)
    {
        return 1
    }else
    return null;
}



function checkExistance(inputNumber)
{
 


   let tobeVarified =   USERDBS.findOne({mobile : inputNumber})
   .catch(error =>{
       console.log("Error Code BSDB 003");
   })

   return tobeVarified;
}




//now for the new registration form

function checkValidation(obj,mobileNumber)
{
    let datatobesaved = new Object;



    if(obj.fname == "")
    {
        return {err : 1 , msg : "First name cannot be empty"}
    }else if (obj.pass == "")
    {
        return {err : 1 , msg : "Enter the password.."}
    }else if(obj.pass.length < 5)
    {
        return {err : 1 , msg : "Password should be greater than 5"}
    }else if(obj.pass != obj.cnfpass)
    {
        return {err : 1 , msg : "Password and confirm password does not match.."}
    }else if(mobileNumber.length == 0 || mobileNumber.length < 10 )
    {
        return {err : 1 , msg : "please enter valid  mobile number.."}
    }
    else if(obj.state == "")
    {
        return {err : 1 , msg : "Please select your state"}
    }else if(obj.email.length <= 12)
    {
        return {err : 1 , msg : "Please Enter the valid email id"}
    }else
    {
            //well no need to write bellow`s code coz we can return directly obj  

     
            
                for (i in obj)
                {
          
                    if(obj[i] == "")
                    {
                      //   obj[i] = null
                        datatobesaved[i] = null
                    }else
                    {
                      datatobesaved[i] = obj[i]
                    }
                }
                datatobesaved.err = 0;
           
               
                
                return datatobesaved;
            

     
    }

}




function books_Information_errorCheck(bookData,bookImage){{


    if(bookData.bname == "" || bookData.bname.length < 3)
    {
        return {err : 1 , message : "Invalid Book Name"}
    }else if (bookData.pyear == "") return {err : 1 , message : "invalid Published year"}
    else if(bookData.language == 0) return {err : 1 , message : "Please provide the language of book..."}
    else if(bookData.category == 0) return {err : 1 , message : "Please Select the book category"}
    else if(bookData.btype == 0 ) return {err : 1 , message : "Please Book type "}
    else if (bookData.class == 0) return {err : 1 , message : "Please select the class"}
    else if(bookData.price < 0) return {err : 1 , message : "invalid Book Price.."}
    else if(bookImage.bookimg.length > 5 ) return {err : 1 , message : "Only 5 Images You Can Upload..."}


    else
    {
        for(i in bookData)
        {
           
            
      
                if(bookData[i] == "")
                {
                 
                    bookData[i] = null
                }
            
           
        }

        bookData.err = 0;
       
           
            
        return bookData;
        
    }


}}


//for the Projects

function checkProjectInformation(projectData)
{
    if(projectData.bname == "" || projectData.length < 3) return {err : 1, message : "Project name is invalid "}
    else if(projectData.link == "" || projectData.link.length < 10) return {err :1, message : "Link is invalid "}
    else if(projectData.element == "") return {err :1, message : "Please enter the element used in this projects"}
    else
    {
      
        
            for(i in projectData)
            {
               
                
          
                    if(projectData[i] == "")
                    {
                     
                        projectData[i] = null
                    }
                
               
            }
    
            projectData.err = 0;
           
               
                
            return projectData;
            
        
    }

}


function pdfValidator(dataPDF)
{
    if(dataPDF.pname == "" || dataPDF.pname.length <3)
    {
        return {err : 1, message :"Invalid PDF name"}
    }else if(dataPDF.language == 0)
    {
        return {err : 1, message : "Please select the pdf language"}
    }else
    {
        for(i in dataPDF)
        {
           
            
      
                if(dataPDF[i] == "")
                {
                 
                    dataPDF[i] = null
                }
            
           
        }

        dataPDF.err = 0;
       
           
            
        return dataPDF;
        
    }
}

//validation for the book pdf pdfpreview

async function booksrequirement(bookdata,userdata){

    let author = await books.findOne({_id : bookdata ,userid : userdata})

    if(author)
    {
        let userbookinfo = await userbook.findOne({userid : userdata});

        if(userbookinfo)
        {
            for(i in userbookinfo.books){

                if(userbookinfo.books[i].bookid == author._id)
                {
                    bookdateandstatus = userbookinfo.books[i]
                    break;
                }
            }

            return {abook : author,ubook : bookdateandstatus}

        }else
        {
            return 2;
        }


    }else
    {
        return 1;
    }




}

async function pdfrequirement(pdfdata,userdata){

    let author = await pdfs.findOne({_id : pdfdata ,userid : userdata})

    if(author)
    {
        let userpdfinfo = await userpdf.findOne({userid : userdata});

        if(userpdfinfo)
        {
            for(i in userpdfinfo.pdf){

                if(userpdfinfo.pdf[i].pdfid == author._id)
                {
                    pdfdateandstatus = userpdfinfo.pdf[i]
                    break;
                }
            }

            return {apdf : author,updf : pdfdateandstatus}

        }else
        {
            return 2;
        }


    }else
    {
        return 1;
    }


}

async function projectrequirement(projectdata,userdata){

    let author = await projects.findOne({_id : projectdata ,userid : userdata})

    if(author)
    {
        let userprojectinfo = await userproject.findOne({userid : userdata});

        if(userprojectinfo)
        {
            for(i in userprojectinfo.project){

                if(userprojectinfo.project[i].projectid == author._id)
                {
                    projectdateandstatus = userprojectinfo.project[i]
                    break;
                }
            }

            return {aproject : author,uproject : projectdateandstatus}

        }else
        {
            return 2;
        }


    }else
    {
        return 1;
    }
}
module.exports = {checkNumber,checkExistance,checkValidation,books_Information_errorCheck,checkProjectInformation,pdfValidator,booksrequirement,
pdfrequirement,projectrequirement}