import React, { useRef, useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import {
  useGetWebinfoQuery,
  usePatchWebinfoMutation,
} from "../../../store/api/webinfoapi";
import { Webinfovalidation } from "../Validation/Webinfovalidation";
const Webinfoform = () => {
  const { data, isLoading } = useGetWebinfoQuery();
  const imageInputRef = useRef(null);
  const [showstatus, setshowstatus] = useState(false);

  // Edit Webinfo api start here
  const [patchwebinfo] = usePatchWebinfoMutation();

  const WebinfoForm = async (value) => {
    try {
      const response = await patchwebinfo({ data: value });

      if (!response.error) {
        if (response.data.status == "successfully added") {
          window.location.reload();
        }
      } else {
        // setapiresponse(response.error.error);
      }
    } catch (error) {}
  };
  // Edit Webinfo api end here

  return isLoading == true ? (
    ""
  ) : (
    <div className="container-fuild pb-4 pt-3 px-2 bg-white">
      {showstatus == true ? (
        <div className="col-12 alert alert-success mt-3 ml-2" role="alert">
          <h5 style={{ padding: "0px", margin: "0px" }}>
            Successfully Updated
          </h5>
        </div>
      ) : (
        <div></div>
      )}
      <Formik
        initialValues={{
          name: "",
          subject: "",
          description: "",
          noOfStar: "",
          logo: "",
        }}
        validationSchema={Webinfovalidation}
        onSubmit={(values) => {
          const formdata = new FormData();
          formdata.append("name", values.name);
          formdata.append("subject", values.subject);
          formdata.append("description", values.description);
          formdata.append("noOfStar", values.noOfStar);

          if (values?.logo) {
            formdata.append("logo", values?.logo);
          }
          WebinfoForm(formdata);
        }}
      >
        {({ values, errors, handleSubmit, touched, setFieldValue }) => (
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <div
              className="row bg-white pb-4 round"
              style={{
                border: "1px solid #E0E0E0",
                margin: "10px 0px",
                borderRadius: "3px",
                position: "relative",
              }}
            >
              <div className="col-md-6 px-2 pt-3">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="" className="form-label ">
                      Name <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <Field
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Neha Sharma"
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.instagram && touched.instagram ? (
                      <p style={{ color: "red" }}>{errors.instagram}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6 px-2 pt-3">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="" className="form-label ">
                      Subject <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <Field
                      name="subject"
                      type="text"
                      className="form-control"
                      placeholder="About Quality"
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.youtube && touched.youtube ? (
                      <p style={{ color: "red" }}>{errors.youtube}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6 px-2 pt-3">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="" className="form-label ">
                      Description <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <Field
                      name="description"
                      type="text"
                      className="form-control"
                      placeholder="Decent Product i seen "
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.twitter && touched.twitter ? (
                      <p style={{ color: "red" }}>{errors.twitter}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6 px-2 pt-3">
                <div className="row">
                  <div className="col-lg-4">
                    <label htmlFor="" className="form-label ">
                      No of Star <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <Field
                      name="noOfStar"
                      type="number"
                      className="form-control"
                      placeholder="5"
                    />
                  </div>
                  <div className="offset-lg-4 col-lg-8">
                    {errors.pinterest && touched.pinterest ? (
                      <p style={{ color: "red" }}>{errors.pinterest}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="col-12 pt-3">
                <div className="row">
                  <div className="col-lg-12">
                    <label htmlFor="" className="form-label ">
                      User Logo <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                  </div>
                  <div className="col-12">
                    <div className="border d-flex justify-content-center">
                      <button
                        type="button"
                        style={{
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <input
                          type="file"
                          name="logo"
                          style={{ display: "none" }}
                          ref={imageInputRef}
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue("logo", event.currentTarget.files[0]);
                          }}
                        />
                        <img
                          src={
                            values.logo && URL?.createObjectURL(values?.logo)
                          }
                          alt="Fashion Needles User Logo"
                          width="100%"
                          height="200px"
                          onClick={() => {
                            imageInputRef.current.click();
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {errors.logo && touched.logo ? (
                      <p style={{ color: "red" }}>{errors.logo}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className="col-12 py-5 px-4 d-flex justify-content-end"
                style={{ gap: "4px" }}
              >
                <button
                  type="submit"
                  className="btn5"
                  style={{ background: "#0e5da9" }}
                >
                  Create
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Webinfoform;
