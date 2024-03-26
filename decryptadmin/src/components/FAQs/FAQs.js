import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useToast } from "@chakra-ui/toast"
import { updateFAQs } from '../../apiService';
import { navigate } from '@reach/router';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Footer from "../Footer/Footer"

const FAQs = () => {

  const [question, setQuestion] = useState();
  const [order, setOrder] = useState();
  const [answer, setAnswer] = useState();
  const toast = useToast()

  let res = sessionStorage.getItem("Authorization")
  console.log("res is -------->", res)


  if(res == null){
    window.location.href = '/'
    setTimeout(function(){window.location.reload()}, 100);
  }
    // setTimeout(function(){window.location.reload()}, 100);


  const addFaq = async () => {



    console.log("val is -------->", question, order, answer);
    // if(question !== null && order !== null || question.length<0 && order.length<0){

    if (question === undefined) {
      toast({ title: "Question cannot be Empty", status: "error", position: "top", duration: 1000, isClosable: true, })
      // alert("validate")

    } else if (answer === undefined) {
      toast({ title: "Answer cannot be Empty", status: "error", position: "top", duration: 1000, isClosable: true, });


    } else {

      let data = {
        sQuestion: question,
        sAnswer: answer,
        order: order
      }
      let orderres = await updateFAQs(data);
      console.log("order result is", orderres);

      if (orderres.message === "FAQs created") {
        toast({ title: "FAQ Created Successfully", status: "success", position: "top", duration: 800, isClosable: true, });
        setTimeout(function () { window.location.reload() }, 800);
        //window.location.reload();
      } else {
        toast({ title: orderres.message, status: "error", position: "top", duration: 800, isClosable: true, });
        //window.location.reload();

      }

    }
    setQuestion('');
    setOrder('');


  }
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (


    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className='main-panel'>
          <div className="content-wrapper">
            <div className='row'>
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h2 className='mb-3 card-title'>FAQs</h2>
                    <div className="mb-4 form-group">
                      <label>Question</label>
                      <input type='text' name='question' onChange={(e) => {

                        setQuestion(e.target.value)
                      }} value={question} className='form-control' />
                    </div>
                    <div className="mb-4 form-group">
                      <label>Answer</label>
                      <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        // initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: "preview powerpaste casechange searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample advtable table charmap pagebreak nonbreaking anchor advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter permanentpen pageembed linkchecker emoticons export",

                          toolbar: 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                        }}
                        onEditorChange={(newValue, editor) => {


                          setAnswer(newValue);
                          //setText(editor.getContent({format: 'text'}));
                        }}
                      />
                    </div>
                    <div className="mb-4 form-group">
                      <label> Order</label>
                      <input type='text' name='order' onChange={(e) => {
                    
                      setOrder(e.target.value.replace(/\D/g, ''))
                    }} value={order} className="form-control" />
                    </div>

                    <button className="btn btn-gradient-primary col-lg-2" onClick={addFaq}>Add FAQ</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>

  );
}

export default FAQs
