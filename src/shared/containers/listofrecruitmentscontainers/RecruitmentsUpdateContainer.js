import React, { useEffect, useRef, useState } from "react";
import style from "./RecruitmentsCreateContainer.module.scss";
import TabTable from "shared/components/common/tab-table/TabTable";
import useRouterV2 from "hooks/use-router-v2";

import CustomFormProvider from "shared/components/common/custom-form/CustomFormProvider";
import useRouter from "hooks/use-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router";
import RouterPath from "router/RouterPath";
import Box from "shared/components/common/box/Box";
import LoadingButton from "shared/components/common/button-loading/ButtonLoading";
import FormEditor from "shared/components/common/custom-form/FormEditor";
import FormImage from "shared/components/common/custom-form/FormImage";
import FormInput from "shared/components/common/custom-form/FormInput";
import FormInputV2 from "shared/components/common/custom-form/FormInputV2";
import FormSelect from "shared/components/common/custom-form/FormSelect";
import FormDateTimePicker from "shared/components/common/custom-form/FormDateTimePicker";
import FormDatePicker from "shared/components/common/custom-form/FormDatePicker";
import FormTextArea from "shared/components/common/custom-form/FormTextArea";
import FooterManage from "shared/components/footer/FooterManage";
import FormGroupSearch from "shared/components/common/form/form-search/FormGroupSearch";
import FormGroupSearchRow from "shared/components/common/form/form-search/FormGroupSearchRow";
import FormItem from "shared/components/common/form/FormItem";
import TextLabelCommon from "shared/components/common/label/TextLabel";
import TextLabelCommonV2 from 'shared/components/common/label/TextLabelV2';
import ButtonCommon from "shared/components/common/button/ButtonCommon";
import Validator from "utils/Validator";
import moment from "moment";
import FormTagsInput from "shared/components/common/custom-form/FormTagsInput";
import FormImageV3 from "shared/components/common/custom-form/FormImageV3";
import actionListOfRecruiters from "redux/listofrecruitment/action";
import FormSelectV2 from 'shared/components/common/custom-form/FormSelectV2';
import BoxV3 from "shared/components/common/box/BoxV3";
import { styled } from "@mui/system";
import IcDropDown from "assets/icon/Icon-Drop";
import Constants from "utils/Constants";
import APITESST from "utils/APITESST";
import Image from "material-ui-image";
import { slug, specialTrim } from "utils/Helper";
import entries from "lodash/entries";
import FormImageV2 from "shared/components/common/custom-form/FormImageV2";
import IconImageUpload from "assets/images/icons/IconImageUpload";
import Validate from "utils/Validate";
import { useFieldArray, useFormContext } from "react-hook-form";
import IcAddinter from "assets/images/icons/ic-addinter";
import Iccloseindel from "assets/images/icons/ic-closeindel";
import { IconButton } from "@mui/material";
import { IcAdd } from "assets/images/icons/icon-list";
import FooterManageV2 from 'shared/components/footer/FooterManageV2';
import FormImageV4 from "shared/components/common/custom-form/FormImageV4";
import {
  convertToCurrency,
  convertToCurrencyDot,
  getValueCurrency,
  setValueCurrency,
} from "utils/Helper";
function RecruitmentsUpdateContainer(props) {
  const methods = useForm();
  const [canSubmit, setCanSubmit] = useState("");
  const [values, setValues] = React.useState(0);
  const router = useRouterV2();
  const { id } = useParams();
  const [valueWorkTypes, setvalueWorkTypes] = useState([])
  const [valueToLabelMap, setvalueToLabelMap] = useState([]);
  const { recruitment, isLoading, paging, listRecruitmentCouncils } = useSelector((state) => state.Recruitment);
  const [fillDataSalary, setfillDataSalary] = useState("Nội dung hiển thị trên trang web:");
  const [getDataShowTypeSalary, setGetDataShowTypeSalary] = useState(1);
  const [fillDataSalarySet, setfillDataSalarySet] = useState("");
  const [fillDataSalarySetData, setfillDataSalarySetData] = useState("");
  useEffect(() => {
    if (recruitment) {
      const contactInfo = recruitment.ContactInfo;
      let contactInfoObject = {};
      if (contactInfo !== null && contactInfo !== undefined) {
        try {
          contactInfoObject = JSON.parse(contactInfo);

        } catch (error) {
          contactInfoObject = {}
        }
      } else {
        contactInfoObject = {}
      }
      if (!fillDataSalarySet) {
        methods.setValue("Salaryfrom", recruitment ? recruitment.SalaryFrom : "");
        methods.setValue("Salaryupto", recruitment ? recruitment.SalaryTo : "");
      }
      methods.setValue("Recruitmentproposal", recruitment ? recruitment.RecruitmentProposalId : ""),
        methods.setValue("Title", recruitment ? recruitment.Title : ""),
        methods.setValue("Part", recruitment ? recruitment.Department : ""),
        methods.setValue("Vacancies", recruitment?.Position),
        methods.setValue("WorkType", recruitment?.WorkType),
        methods.setValue("Rank", recruitment ? recruitment.Rank : ""),
        methods.setValue("Branches", recruitment?.Branches),
        methods.setValue("Recruitmentplan", recruitment ? recruitment.Gender : ""),
        methods.setValue("Quantity", recruitment ? recruitment.Quantity : ""),
        methods.setValue("FromPicker", recruitment ? recruitment.From : ""),
        methods.setValue("ToPicker", recruitment ? recruitment.To : ""),
        methods.setValue("Currency", recruitment ? recruitment.CurentType : ""),
        methods.setValue("Showtypesalary", recruitment ? recruitment.ShowTypeSalary : ""),
        methods.setValue("Contact", contactInfoObject ? contactInfoObject.ID : ""),
        methods.setValue("Phonenumber", contactInfoObject ? contactInfoObject.Phonenumber : ""),
        methods.setValue("Email", contactInfoObject ? contactInfoObject.Email : ""),
        methods.setValue("Fanpagefacebook", contactInfoObject ? contactInfoObject.Fanpagefacebook : ""),
        methods.setValue("Addressnew", contactInfoObject ? contactInfoObject.Addressnew : ""),
        methods.setValue("Link", recruitment ? recruitment.ApplyUrl : ""),
        methods.setValue("Descriptions", recruitment ? recruitment.Descriptions : ""),
        methods.setValue("Requirements", recruitment ? recruitment.Requirements : ""),
        methods.setValue("Benefit", recruitment ? recruitment.Benefit : ""),
        methods.setValue("Cv", recruitment ? recruitment.Cv : ""),
        methods.setValue("FileImage", [{ data_url: recruitment?.Image }]),
        methods.setValue("MetaKeyword", recruitment ? recruitment.MetaKeyword : "");
      methods.setValue("WorkTime", recruitment ? recruitment.WorkTime : "");
      methods.setValue("Status", recruitment ? recruitment.Status : "");
      methods.setValue("MetaDescriptions", recruitment ? recruitment.MetaDescriptions : "");
      methods.setValue("MetaTitle", recruitment ? recruitment.MetaTitle : "");
      methods.setValue("Slug", recruitment ? recruitment.Slug : "");
      let updatedFillTyle = [];
      let fillHoverWorkTypes = [];
      recruitment?.Position?.forEach(item => {

        updatedFillTyle[item] = valueToLabelMap[item];
      });
      recruitment?.WorkType?.forEach(item => {
        fillHoverWorkTypes[item] = valueWorkTypes[item];
      });
      setfillTyleWorkTypes(fillHoverWorkTypes);
      setfillTyle(updatedFillTyle);
      setfillDataSalarySetData(recruitment?.SalaryFrom );
       
     
    }

  }, [recruitment, fillDataSalarySet]);

  useEffect(() => {
    if (id) {
      dispatch({
        type: actionListOfRecruiters.GET_DATA_RECRUITMENTS_DETAIL,
        payload: id,
      });
    }
  }, [id]);
  const TabScreen = [
    {
      id: Constants.TEXT_RECRUITER.STATUS_EMPLOYMENT_INFORMATION.VALUE,
      type: Constants.TEXT_RECRUITER.STATUS_EMPLOYMENT_INFORMATION.VALUE,
      text: Constants.TEXT_RECRUITER.STATUS_EMPLOYMENT_INFORMATION.NAME,
    },
    {
      id: Constants.TEXT_RECRUITER.WOMANRECRUITMENTCOUNCIL.VALUE,
      type: Constants.TEXT_RECRUITER.WOMANRECRUITMENTCOUNCIL.VALUE,
      text: Constants.TEXT_RECRUITER.WOMANRECRUITMENTCOUNCIL.NAME,
    },
  ];
  const handleChange = (newValue) => {
    if (newValue != -1) {
      setValues(Number(newValue));
    }
  };
  const [dataSetName, setDataSetName] = useState("");
  const onSubmit = (data) => {
    let ContactInfo = {
      ID: data?.Contact || '',
      Phonenumber: data?.Phonenumber || '',
      Email: data?.Email || '',
      Fanpagefacebook: data?.Fanpagefacebook || '',
      Addressnew: data?.Addressnew || '',
      Contact: dataSetName,
    }
    const ContactInfos = JSON.stringify(ContactInfo);
    const filteredRecruitmentCouncils = data?.Data?.filter(item => {
      return item.member !== undefined && item.member !== 0 && item.partbophan !== undefined && item.partbophan !== '' && item.location !== undefined && item.location !== '';
    });
    let params = {
      Id: recruitment?.Id,
      RecruitmentProposalId: data?.Recruitmentproposal || '',
      Title: data?.Title,
      Departments: data?.Part,
      Branches: data?.Branches || '',
      From: moment(data?.FromPicker || '').format("YYYY-MM-DD hh:mm:ss"),
      To: moment(data?.ToPicker || '').format("YYYY-MM-DD hh:mm:ss"),
      SalaryFrom: data?.Salaryfrom,
      SalaryTo: data?.Salaryupto,
      Salary: fillDataSalary,
      CurentType: data?.Currency,
      Status: data?.Status,
      ContactInfo: ContactInfos,
      FileImage: data?.FileImage || '',
      Descriptions: data?.Descriptions || '',
      Requirements: data?.Requirements || '',
      Benefit: data?.Benefit || '',
      Cv: data?.Cv || '',
      Code: data?.Code || '',
      MetaKeyword: data?.MetaKeyword || '',
      MetaTitle: data?.MetaTitle,
      MetaDescriptions: data?.MetaDescriptions,
      RecruitmentCouncils: filteredRecruitmentCouncils || [],
      WorkTime: data?.WorkTime || '',
      RecruitPosition: data?.RecruitPosition || '',
      ShowTypeSalary: data?.Showtypesalary || '',
      Slug: data?.Slug || '',
    };
    dispatch({
      type: actionListOfRecruiters.UPDATE_RECRUITMENTS_DATA,
      payload: params,
      callback: {
        success: (id) => {
          router.push({
            pathname: RouterPath.RECRUITMENT,
          });
        },
      },
    });
  };
  const dispatch = useDispatch();
  const statusOptions = useSelector((state) => state.Recruitment.listStatus);
  const postionOptions = useSelector((state) => state.Recruitment.listPositions);

  const [PostionOtion, SetPostionOtion] = useState([]);

  useEffect(() => {
    if (Array.isArray(postionOptions)) {
      SetPostionOtion(postionOptions);
      const newValueToLabelMap = {};
      postionOptions.forEach(item => {
        newValueToLabelMap[item.value] = item.label;
      });
      setvalueToLabelMap(newValueToLabelMap);
    }

  }, [postionOptions])
  const provinceOptions = useSelector((state) => state.Recruitment.provinces);
  const [Province, SetProvince] = useState([]);
  useEffect(() => {
    const provincelist = entries(provinceOptions).map(([key, value]) => ({
      value: parseInt(value.Id),
      label: value.Name,
    }));
    SetProvince(provincelist);
  }, [provinceOptions]);
  const Departments = useSelector((state) => state.Recruitment.listdepartments);
  const recruitmentProposalslist = useSelector(
    (state) => state.Recruitment.listrecruitmentproposalsidnew
  );
  useEffect(() => {
    dispatch({
      type: actionListOfRecruiters.GET_DATA_LIST_RECRUITMENT_PROPOSSAL,
      payload: id,
    });
  }, []);
  const [optionsrecruitmentProposals, setoptionsrecruitmentProposals] =
    useState();

  useEffect(() => {
    const recruitmentlistProposals = entries(recruitmentProposalslist).map(
      ([key, value]) => ({
        value: parseInt(value.Id),
        label: value.Title,
      })
    );
    setoptionsrecruitmentProposals(recruitmentlistProposals);
  }, [recruitmentProposalslist]);
  const employeeslist = useSelector((state) => state.Recruitment.listemployees);
  const [optionsemployeeslist, setoptionsemployeeslist] = useState();
  useEffect(() => {
    const employees = entries(employeeslist).map(([key, value]) => ({
      value: parseInt(value.Id),
      label: value.FullName,
    }));
    setoptionsemployeeslist(employees);
  }, [employeeslist]);
  useEffect(() => {
    dispatch({
      type: actionListOfRecruiters.GET_DATA_RECRUITMENTS_MARTER,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: actionListOfRecruiters.GET_DATA_EMPLOYEES,
    });
  }, []);
  const FormWrapper = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  });
  const FormButtonWrapper = styled("div")({
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
  });
  const GeneralWrapper = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "40px",
  });
  /////api
  const recruitmentproposal = APITESST.recruitmentproposal;
  const Rank = APITESST.Rank;
  const malegender = APITESST.malegender;
  const currency = APITESST.currency;
  const display = APITESST.display;
  const Contact = APITESST.Contact;
  const workTypes = APITESST.workTypes;
  const Status = APITESST.Status;
  useEffect(() => {
    const newValueWorkTypes = {};
    workTypes.forEach(item => {
      newValueWorkTypes[item.value] = item.label;
    });
    setvalueWorkTypes(newValueWorkTypes);
  }, [workTypes])
  const Part = APITESST.Part;
  ////hội đồng tuyển
  const handleSubmitGeneralSearchForm = () => { };
  const { required, number, maxLength } = Validate;
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const { fields, move, remove, update, prepend, append } = useFieldArray({
    control,
    name: "Data",
  });
  const [dataSetEmploy, setdataSetEmploy] = useState(0);
  const [dataSetEmploy2, setdataSetEmploy2] = useState(0);
  const onchaneContactlis = (e, index, indexl) => {
    if (index) {
      setdataSetEmploy(index);
      setdataSetEmploy2(indexl);
    }
  }
  const [isDataAdded, setIsDataAdded] = useState(false);
  useEffect(() => {
    if (dataSetEmploy !== 0 && !isDataAdded) {
      const listCondidatesnew = entries(employeeslist).map(([key, value]) => ({
        member: parseInt(value.Id),
        partbophan: value.PositionId,
        location: value.PositionName,
        indexl: parseInt(key),
        id: value.Id,
      }));
      listCondidatesnew.forEach((item) => {
        if (dataSetEmploy == item.member) {
          methods.setValue(`Data.${dataSetEmploy2}.partbophan`, item.partbophan);
          methods.setValue(`Data.${dataSetEmploy2}.location`, item.location);
        }

      });

    }

  }, [employeeslist, dataSetEmploy, dataSetEmploy2, isDataAdded, append]);
  const lastIndex = fields.length - 1;
  const [listCondidatesidnew, setlistCondidatesidnew] = useState(null);
  useEffect(() => {
    const listCondidatesnew = entries(listRecruitmentCouncils).map(
      ([key, value]) => ({
        member: parseInt(value.EmployeeId),
        partbophan: value.PositionId,
        location: value.PositionName,
        indexl: parseInt(key),
      })
    );
    setlistCondidatesidnew(listCondidatesnew);
    listCondidatesnew.forEach((item) => {
      methods.setValue(`Data[${item.indexl}].member`, item.member);
      methods.setValue(`Data[${item.indexl}].partbophan`, item.partbophan);
      methods.setValue(`Data[${item.indexl}].location`, item.location);
      append(item); // Thêm từng đối tượng vào mảng 'Data'
    });
  }, [listRecruitmentCouncils, prepend, append]);

  useEffect(() => {
    reset({ Data: listRecruitmentCouncils });
  }, [listRecruitmentCouncils]);
  const onCreateItem = () => {
    prepend(
      {
        member: 0,
        partbophan: "",
        location: "",
      },
      { shouldFocus: false }
    );
  };
  const onDeleteItem = (index) => {
    remove(index);
    methods.setValue(`Data.${index}.member`, 0);
    methods.setValue(`Data.${index}.partbophan`, '');
    methods.setValue(`Data.${index}.location`, '');
  };
  const [dataReset, setDataReset] = useState(0);
  const [fillTyle, setfillTyle] = useState([]);
  const [fillTyleWorkTypes, setfillTyleWorkTypes] = useState([]);
  const onChangeDisplay = (e) => {
    setGetDataShowTypeSalary(e);
  }
  const recruitmentPopossalId = useSelector((state) => state.Recruitment.listRecruitmentProposalsID);
  useEffect(() => {
    if (dataReset != 0) {
      if (recruitmentPopossalId && Array.isArray(recruitmentPopossalId.Position) && recruitmentPopossalId.Position.length > 0) {
        let updatedFillTyle = [];
        let fillHoverWorkTypes = [];
        if (!fillDataSalarySet) {
          methods.setValue("Salaryfrom", recruitmentPopossalId.SalaryFrom || 0);
          methods.clearErrors("Salaryfrom");
          methods.setValue("Salaryupto", recruitmentPopossalId.SalaryTo || 0);
          methods.clearErrors("Salaryupto");
        }
        methods.setValue("Part", recruitmentPopossalId.Department || "");
        methods.clearErrors("Part");
        methods.setValue("Recruitmentplan", recruitmentPopossalId.Gender || "");
        methods.clearErrors("Recruitmentplan");
        methods.setValue("Quantity", recruitmentPopossalId.Quantity || "");
        methods.clearErrors("Quantity");
        methods.setValue("Code", recruitmentPopossalId.Code || "");
        methods.clearErrors("Code");
        methods.setValue("Vacancies", recruitmentPopossalId.Position || "");
        methods.clearErrors("Vacancies");
        methods.setValue("WorkType", recruitmentPopossalId.WorkTypes || 0);
        methods.clearErrors("WorkType");
        methods.setValue("Branches", recruitmentPopossalId.Branches || 0);
        methods.clearErrors("Branches");
        methods.setValue("Slug", slug(specialTrim(recruitmentPopossalId?.Title || 0)));
        methods.clearErrors("Slug");
        recruitmentPopossalId.Position.forEach(item => {
          updatedFillTyle[item] = valueToLabelMap[item];
        });
        recruitmentPopossalId.WorkTypes.forEach(item => {
          fillHoverWorkTypes[item] = valueWorkTypes[item];
        });
        setfillTyleWorkTypes(fillHoverWorkTypes);
        setfillTyle(updatedFillTyle);
      }
    }
    if (!fillDataSalarySet && recruitmentPopossalId.length!=0 ) {
      console.log(getDataShowTypeSalary,"getDataShowTypeSalary23");
      if (getDataShowTypeSalary === 1) {
        setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitmentPopossalId?.SalaryFrom ? recruitmentPopossalId?.SalaryFrom : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(recruitmentPopossalId?.SalaryTo ? recruitmentPopossalId?.SalaryTo : 0) + ' ' + 'VNĐ');
      } else if (getDataShowTypeSalary === 2) {
        setfillDataSalary('Nội dung hiển thị trên trang web: Thỏa thuận');
      } else if (getDataShowTypeSalary === 3) {
        setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitmentPopossalId?.SalaryFrom ? recruitmentPopossalId?.SalaryFrom : 0) + ' ' + 'VNĐ');
      } else if (getDataShowTypeSalary === 4) {
        setfillDataSalary('Nội dung hiển thị trên trang web: Lên đến' + ' ' + convertToCurrencyDot(recruitmentPopossalId?.SalaryTo ? recruitmentPopossalId?.SalaryTo : 0) + ' ' + 'VNĐ');
      }
    }else{
     if (recruitment.ShowTypeSalary == 1) {
        if (getDataShowTypeSalary === 1) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 2) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Thỏa thuận');
        } else if (getDataShowTypeSalary === 3) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom  : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 4) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Lên đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        }
      } else if (recruitment.ShowTypeSalary == 2) {
        if (getDataShowTypeSalary === 1) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 2) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Thỏa thuận');
        } else if (getDataShowTypeSalary === 3) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom  : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 4) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Lên đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        }
      } else if (recruitment.ShowTypeSalary == 3 ) {
        if (getDataShowTypeSalary === 1) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 2) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Thỏa thuận');
        } else if (getDataShowTypeSalary === 3) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom  : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 4) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Lên đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        }
      } else if (recruitment.ShowTypeSalary == 4 ) {
        if (getDataShowTypeSalary === 1) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 2) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Thỏa thuận');
        } else if (getDataShowTypeSalary === 3) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitment?.SalaryFrom ? recruitment?.SalaryFrom  : 0) + ' ' + 'VNĐ');
        } else if (getDataShowTypeSalary === 4) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Lên đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
        }
      }

    }


  }, [ getDataShowTypeSalary, fillDataSalarySet,recruitment,recruitmentPopossalId,fillDataSalary])
  ////chọn đề xuất
  const onchanerecruitmentProposals = (e) => {
    if (e) {
      setDataReset(e);
      dispatch({
        type: actionListOfRecruiters.GET_DATA_RECRUITMENT_PROPOSSAL_ID,
        payload: e,
      });
    }
  };
  const [indexemplo, setindexemplo] = useState("");
  const onchaneContact = (e, index, eidexn) => {
    setindexemplo(index);
    if (index) {
      employeeslist.map((item) => {
        if (index == item.Id) {
          methods.setValue("Phonenumber", "09095552225");
          methods.setValue("Email", "tuyendung@fmstyle.com.vn");
          methods.setValue("Fanpagefacebook", "https://www.facebook.com/fmstyletuyendung");
          methods.setValue("Addressnew", "48 Yên Bái,Hải Châu,Đà Nẵng");
          setDataSetName(item.FullName);
        }
      });
    }
  };
  const checkVacancies = (e) => {
    if (e) {
      PostionOtion.map((item) => {
        if (e == item.value) {
          methods.setValue("RecruitPosition", item.label ? item.label : "");
        }
      });
    }
  };
  const handleCancel = () => {
    router.push({ pathname: RouterPath.RECRUITMENT });
  };
  let watchValue = methods.watch([
    "SalaryFrom",
    "SalaryTo",
    "AgeFrom",
    "AgeTo",
  ]);
  useEffect(() => {
    if (!watchValue[0]) {
      return;
    }
    if (!watchValue[1]) {
      return;
    }

    methods.trigger("SalaryFrom");
    methods.trigger("SalaryTo");
  }, [watchValue[0], watchValue[1]]);
  useEffect(() => {
    if (!watchValue[2]) {
      return;
    }
    if (!watchValue[3]) {
      return;
    }

    methods.trigger("AgeFrom");
    methods.trigger("AgeTo");
  }, [watchValue[2], watchValue[3]]);
  const [valueSetMoney1, setValueSetMoney1] = useState(0);
  const [valueSetMoney2, setValueSetMoney2] = useState(0);
  useEffect(() => {
    if (fillDataSalarySet) {
      if (getDataShowTypeSalary === 1) {
        if (valueSetMoney1 != 0 && valueSetMoney2 == 0 && (recruitmentPopossalId || recruitment)) {
          if (recruitmentPopossalId.length >= 0) {
            setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(valueSetMoney1 ? valueSetMoney1 : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(recruitmentPopossalId?.SalaryTo ? recruitmentPopossalId?.SalaryTo : 0) + ' ' + 'VNĐ');
          } else {
            setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(valueSetMoney1 ? valueSetMoney1 : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(recruitment?.SalaryTo ? recruitment?.SalaryTo : 0) + ' ' + 'VNĐ');
          }
        } else if (valueSetMoney2 != 0 && valueSetMoney1 == 0 && recruitmentPopossalId) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(recruitmentPopossalId?.SalaryFrom ? recruitmentPopossalId?.SalaryFrom : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(valueSetMoney2 ? valueSetMoney2 : 0) + ' ' + 'VNĐ');
        } else if (valueSetMoney1 != 0 && valueSetMoney2 != 0) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(valueSetMoney1 ? valueSetMoney1 : 0) + ' ' + 'VNĐ' + ' ' + 'đến' + ' ' + convertToCurrencyDot(valueSetMoney2 ? valueSetMoney2 : 0) + ' ' + 'VNĐ');
        }
      } else if (getDataShowTypeSalary === 2) {
        setfillDataSalary('Nội dung hiển thị trên trang web: Thỏa thuận');
      } else if (getDataShowTypeSalary === 3) {
        setfillDataSalary('Nội dung hiển thị trên trang web: Từ' + ' ' + convertToCurrencyDot(valueSetMoney1 ? valueSetMoney1 : 0) + ' ' + 'VNĐ');
      } else if (getDataShowTypeSalary === 4) {
        if (valueSetMoney2 == 0 && recruitmentPopossalId) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Lên đến' + ' ' + convertToCurrencyDot(recruitmentPopossalId?.SalaryTo ? recruitmentPopossalId?.SalaryTo : 0) + ' ' + 'VNĐ');
        } else if (valueSetMoney2 != 0 || recruitmentPopossalId) {
          setfillDataSalary('Nội dung hiển thị trên trang web: Lên đến' + ' ' + convertToCurrencyDot(valueSetMoney2 ? valueSetMoney2 : 0) + ' ' + 'VNĐ');
        }

      }
    }

  }, [getDataShowTypeSalary, fillDataSalarySet, valueSetMoney1, valueSetMoney2, recruitmentPopossalId, recruitment])
  const MoneyChange1 = (e, indexl) => {
    if (e.target.value) {
      setValueSetMoney1(e.target.value);
      setfillDataSalarySet(e.target.value)
    }
  }
  const MoneyChange2 = (e, indexl) => {
    if (e.target.value) {
      setValueSetMoney2(e.target.value);
      setfillDataSalarySet(e.target.value)
    }
  }
  return (
    <CustomFormProvider {...methods}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <div>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TabTable
              marginTop={false}
              handleChange={handleChange}
              value={Number(values)}
              tabTable={TabScreen}
            />
            {values === 0 && (
              <>
                {" "}
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Thông tin tuyển dụng"
                  icon={<IcDropDown />}
                >
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>Đề xuất tuyển dụng</TextLabelCommon>
                        <FormSelect
                          fieldName="Recruitmentproposal"
                          validate={[Validator.required]}
                          options={optionsrecruitmentProposals ?? []}
                          placeholder="Chọn đề xuất"
                          isPortal={true}
                          onChangeSelect={onchanerecruitmentProposals}

                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>Tiêu đề</TextLabelCommon>
                        <FormInput
                          fieldName="Title"
                          validate={[Validator.required]}
                          placeholder="Nhập tiêu đề"
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>Bộ phận </TextLabelCommon>
                        <FormSelect
                          fieldName="Part"
                          validate={[]}
                          options={Departments}
                          placeholder="Chọn bộ phận"
                          isPortal={true}
                          disabled={true}
                        />
                      </FormItem>

                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>Vị trí tuyển dụng</TextLabelCommon>
                        <FormSelectV2
                          fieldName="Vacancies"
                          validate={[]}
                          options={PostionOtion}
                          placeholder="Chọn tuyển dụng"
                          isPortal={true}
                          disabled={true}
                          isMulti
                          isTooltip={true}
                          fillTyle={fillTyle}
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>Hình thức làm việc </TextLabelCommon>
                        <FormSelectV2
                          fieldName="WorkType"
                          validate={[]}
                          options={workTypes}
                          placeholder="Chọn hình thức làm việc"
                          isPortal={true}
                          disabled={true}
                          isMulti
                          fillTyle={fillTyleWorkTypes}
                          top={"10px"}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>Thời gian làm việc </TextLabelCommon>
                        <FormInput
                          fieldName="WorkTime"
                          validate={[Validator.required]}
                          placeholder="Nhập thời gian"
                        />
                      </FormItem>

                    </FormGroupSearch>
                  </FormGroupSearchRow>
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>Địa chỉ làm việc </TextLabelCommon>
                        <FormSelect
                          fieldName="Branches"
                          validate={[Validator.required]}
                          options={Province}
                          placeholder="Chọn nhiều"
                          isPortal={true}
                          isMulti
                          defaultValue={recruitmentPopossalId.Branches}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>Trạng thái </TextLabelCommon>
                        <FormSelect
                          fieldName="Status"
                          validate={[Validator.required]}
                          options={Status}
                          placeholder="Chọn trạng thái"
                          isPortal={true}

                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Kế hoạch tuyển"
                  icon={<IcDropDown />}
                  titlebox="Khai báo số lượng cần tuyển thực tế để phục vụ thống kê báo cáo."
                >
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>
                          Giới tính cần tuyển
                        </TextLabelCommon>
                        <FormSelect
                          fieldName="Recruitmentplan"
                          validate={[Validator.required]}
                          options={malegender}
                          placeholder="Tất cả"
                          isPortal={true}
                        />
                      </FormItem>

                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online">
                          Số lượng
                        </TextLabelCommon>
                        <FormInput
                          fieldName="Quantity"
                          validate={[Validator.required]}
                          placeholder="0"
                          readOnly={true}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>
                          Từ ngày
                        </TextLabelCommon>
                        <FormDatePicker
                          fieldName="FromPicker"
                          validate={[
                            Validator.required,
                            Validator.maxDate,
                            Validator.CheckedNumber(watchValue[1], 1),
                          ]}
                          placeholder={"dd/mm/yyyy"}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>
                          Hạn cuối
                        </TextLabelCommon>
                        <FormDatePicker
                          fieldName="ToPicker"
                          validate={[
                            Validator.required,
                            Validator.minDate,
                            Validator.CheckedNumber(watchValue[0], 1),
                          ]}
                          placeholder={"dd/mm/yyyy"}
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Mức lương"
                  icon={<IcDropDown />}
                  titlebox={fillDataSalary}
                >
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>
                          Mức lương từ
                        </TextLabelCommon>
                        <FormInputV2
                          fieldName="Salaryfrom"
                          validate={[Validator.required]}
                          placeholder="0"
                          // readOnly={true}
                          format="money"
                          onChangeSelect={(value) => { MoneyChange1(value, 1) }}
                        />
                      </FormItem>

                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>
                          Mức lương đến
                        </TextLabelCommon>
                        <FormInputV2
                          fieldName="Salaryupto"
                          validate={[Validator.required]}
                          placeholder="0"
                          // readOnly={true}
                          format="money"
                          onChangeSelect={(value) => { MoneyChange2(value, 2) }}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online">
                          Loại tiền
                        </TextLabelCommon>
                        <FormSelect
                          fieldName="Currency"
                          validate={[Validator.required]}
                          options={currency}
                          placeholder="VNĐ"
                          isPortal={true}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>
                          Hiển thị trên tin tuyển dụng
                        </TextLabelCommon>
                        <FormSelect
                          fieldName="Showtypesalary"
                          validate={[Validator.required]}
                          options={display}
                          placeholder="Hiển thị trên tin tuyển dụng"
                          isPortal={true}
                          onChangeSelect={onChangeDisplay}

                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Thông tin liên hệ"
                  icon={<IcDropDown />}
                  titlebox="Thông tin này sẽ được hiển thị lên tin tuyển dụng để làm đầu mối liên hệ cho ứng viên"
                >
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommonV2 className="form-online" require icon>
                          Người liên hệ
                        </TextLabelCommonV2>
                        <FormSelect
                          fieldName="Contact"
                          validate={[Validator.required]}
                          options={optionsemployeeslist}
                          placeholder="Chọn người liên hệ"
                          isPortal={true}
                          onChangeSelect={(value) =>
                            onchaneContact("Contact", value, 0)
                          }
                        />
                      </FormItem>

                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online">
                          Số điện thoại{" "}
                        </TextLabelCommon>
                        <FormInput
                          fieldName="Phonenumber"
                          validate={[Validator.required]}
                          placeholder="09095552225"
                        // readOnly={true}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online">
                          Email
                        </TextLabelCommon>
                        <FormInput
                          fieldName="Email"
                          validate={[Validator.required]}
                          placeholder="tuyendung@fmstyle.com.vn"
                        // readOnly={true}
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>
                          Fanpage Facebook
                        </TextLabelCommon>
                        <FormInput
                          fieldName="Fanpagefacebook"
                          validate={[Validator.required]}
                          placeholder="https://www.facebook.com/fmstyletuyendung"
                        // readOnly={true}
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0">
                      <FormItem className="w-100 form-item">
                        <TextLabelCommon className="form-online" require>
                          Địa chỉ liên hệ{" "}
                        </TextLabelCommon>
                        <FormInput
                          fieldName="Addressnew"
                          validate={[Validator.required]}
                          placeholder="48 Yên Bái,Hải Châu,Đà Nẵng"
                          // readOnly={true}
                          onChange={(e) =>
                            onchaneContact("Fanpagefacebook", e.target.value)
                          }
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Mô tả công việc"
                  icon={<IcDropDown />}
                  require
                  titlebox="Ảnh sẽ được hiển thị trên các trang đăng tuyển. Kích thước ảnh tối ưu là 560px x 292px"
                >
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="form-item col-4">
                        <FormImageV4
                          width={"100%"}
                          height={140}
                          fieldName={`FileImage`}
                          validate={[Validator.required]}
                          iconNull={
                            <div className={style["custom-icon-upload"]}>
                              <IconImageUpload />
                              <p>Tải hình ảnh lên từ thiết bị</p>
                            </div>
                          }
                        />
                      </FormItem>
                    </FormGroupSearch>
                    <div
                      className=""
                      height={window.innerHeight - 360}
                      style={{ marginTop: "20px" }}
                    >
                      <TextLabelCommon className="form-online"></TextLabelCommon>
                      <FormItem>
                        <TextLabelCommon className="form-online"></TextLabelCommon>
                        <FormEditor
                          fieldName="Descriptions"
                          validate={[Validator.required]}
                          placeholder="Descriptions"
                          setCanSubmit={setCanSubmit}
                        />
                      </FormItem>
                    </div>
                  </FormGroupSearchRow>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Yêu cầu công việc"
                  icon={<IcDropDown />}
                  require
                  titlebox="Kỹ năng chuyên môn hoặc kỹ năng mềm cần thiết với công việc mà ứng viên cần quan tâm"
                >
                  <div className="" height={window.innerHeight - 360}>
                    <FormItem>
                      <FormEditor
                        fieldName="Requirements"
                        validate={[Validator.required]}
                        placeholder="Requirements"
                        setCanSubmit={setCanSubmit}
                      />
                    </FormItem>
                  </div>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Quyền lợi/chế độ"
                  icon={<IcDropDown />}
                  require
                  titlebox="Những quyền lợi, lợi ích công việc cho ứng viên với vị trí đăng tuyển"
                >
                  <div className="" height={window.innerHeight - 360}>
                    <FormItem>
                      <FormEditor
                        fieldName="Benefit"
                        validate={[Validator.required]}
                        placeholder="Benefit"
                        setCanSubmit={setCanSubmit}
                      />
                    </FormItem>
                  </div>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Hồ sơ yêu cầu"
                  icon={<IcDropDown />}
                  require
                  titlebox="Những hồ sơ cần thiết khi ứng viên ứng tuyển"
                >
                  <FormGroupSearchRow>
                    <TextLabelCommon className="form-online"></TextLabelCommon>
                    <FormItem>
                      <FormEditor
                        fieldName="Cv"
                        validate={[Validator.required]}
                        placeholder="Cv"
                        setCanSubmit={setCanSubmit}
                      />
                    </FormItem>
                  </FormGroupSearchRow>
                </BoxV3>
                <BoxV3 className={`${style['box-container']}`} boxTitle="Online" icon={<IcDropDown />} >
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>Slug</TextLabelCommon>
                        <FormInput
                          fieldName="Slug"
                          validate={[]}
                          placeholder="Slug"
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>Meta title</TextLabelCommon>
                        <FormInput
                          fieldName="MetaTitle"
                          validate={[]}
                          placeholder="Meta title"
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>Meta description</TextLabelCommon>
                        <FormInput
                          fieldName="MetaDescriptions"
                          validate={[]}
                          placeholder="Meta description"
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online" require>Meta keyword</TextLabelCommon>
                        <FormInput
                          fieldName="MetaKeyword"
                          validate={[]}
                          placeholder="Meta keyword"
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                </BoxV3>
                <BoxV3
                  className={`${style["box-container"]}`}
                  style={{ display: "none" }}
                  boxTitle="Khác"
                  icon={<IcDropDown />}
                >
                  <FormGroupSearchRow>
                    <FormGroupSearch className="col-12 p-0 column-gap-3">
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online">
                          Link ứng tuyển
                        </TextLabelCommon>
                        <FormInput
                          fieldName="Code"
                          validate={[]}
                          placeholder="Nhập Code"
                        />
                      </FormItem>
                      <FormItem className="w-100 form-item pl-0">
                        <TextLabelCommon className="form-online">
                          Từ khóa
                        </TextLabelCommon>
                        <FormInput
                          fieldName="RecruitPosition"
                          validate={[]}
                          placeholder="Nhập từ khóa"
                        />
                      </FormItem>
                    </FormGroupSearch>
                  </FormGroupSearchRow>
                </BoxV3>
              </>
            )}
            {values === 30 && (
              <>
                <BoxV3
                  className={`${style["box-container"]}`}
                  boxTitle="Hội đồng tuyển dụng"
                  titlebox="Những thành viên trong hội đồng tuyển dụng sẽ nhận được thông báo khi có ứng viên mới và được xem thông tin offer của ứng viên"
                >
                  <FormGroupSearchRow>
                    {fields.map((row, index) => (
                      <FormGroupSearch
                        key={index}
                        className="col-12 p-0 column-gap-3"
                        style={{ marginBottom: index == 0 ? "20px" : "20px" }}
                      >
                        <FormItem className="w-100 form-item">
                          {index == 0 ? (
                            <TextLabelCommon className="form-online">
                              Thành viên
                            </TextLabelCommon>
                          ) : (
                            ""
                          )}
                          <FormSelect
                            fieldName={`Data.${index}.member`}
                            validate={[]}
                            options={optionsemployeeslist ?? []}
                            placeholder="Chọn nhân sự"
                            isPortal={true}
                            defaultValue={row.member}
                            onChangeSelect={(value) => onchaneContactlis("member", value, index)}
                          />
                        </FormItem>
                        <FormItem className="w-100 form-item pl-0">
                          {index == 0 ? (
                            <TextLabelCommon className="form-online">
                              Bộ phận
                            </TextLabelCommon>
                          ) : (
                            ""
                          )}
                          <FormInput
                            fieldName={`Data.${index}.partbophan`}
                            validate={[]}
                            placeholder="Nhập bộ phận"
                            readOnly={true}
                          />
                        </FormItem>
                        <FormItem className="w-100 form-item">
                          {index == 0 ? (
                            <TextLabelCommon className="form-online">
                              Vị trí
                            </TextLabelCommon>
                          ) : (
                            ""
                          )}
                          <FormInput
                            fieldName={`Data.${index}.location`}
                            validate={[]}
                            placeholder="Nhập vị trí"
                            readOnly={true}
                          />
                        </FormItem>
                        {index === lastIndex ? (
                          <div
                            className={"dep_KX_tiBJ6xuGC1J1AIwSL"}
                            style={{ marginBottom: "0px;" }}
                          >
                            <div
                              className={"dep_U6nqO6JNIZqBNx6c6EkB"}
                              onClick={() => onDeleteItem(index)}
                            >
                              <div
                                style={{
                                  paddingTop: index == 0 ? "26px" : "7px",
                                  marginLeft: "3px",
                                  cursor: "pointer",
                                }}
                              >
                                <div>
                                  <Iccloseindel />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={"dep_KX_tiBJ6xuGC1J1AIwSL"}
                            style={{ marginBottom: "0px;" }}
                          >
                            <div className={"dep_U6nqO6JNIZqBNx6c6EkB"}>
                              <div
                                style={{
                                  paddingTop: index == 0 ? "26px" : "7px",
                                  marginLeft: "3px",
                                  cursor: "pointer",
                                }}
                              >
                                <div style={{ width: "24px" }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </FormGroupSearch>
                    ))}
                  </FormGroupSearchRow>
                  <div
                    className={"avc"}
                    style={{ cursor: "pointer" }}
                    onClick={() => onCreateItem()}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#138300"
                        stroke-width="1.2"
                      ></circle>
                      <path
                        d="M12 7V17"
                        stroke="#138300"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M7 12H17"
                        stroke="#138300"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>
                </BoxV3>
              </>
            )}
            <FooterManageV2 titleBack={"Quay lại "} back={true} routerPath={RouterPath.RECRUITMENT}>
              <div className="d-flex justify-content-end align-items-center">
                <ButtonCommon
                  loading={isLoading}
                  className="mr-3"
                  type="button"
                  onClick={() => handleCancel()}
                  typeColor="border-red"
                >
                  Huỷ bỏ
                </ButtonCommon>
                <LoadingButton loading={isLoading} type="submit">
                  Lưu & Đăng tin
                </LoadingButton>
              </div>
            </FooterManageV2>
          </form>
        </div>
      </div>
    </CustomFormProvider>
  );
}
export default RecruitmentsUpdateContainer;
