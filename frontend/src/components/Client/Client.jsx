

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Mail,
  Lock,
  Globe,
  Sparkles,
  Eye,
  EyeOff,
  Copy,
  Check,
  Image as ImageIcon,
  Film,
  Link as LinkIcon,
  FileText,
} from "lucide-react";

const Client = ({ globalSearch = "" }) => {
  const [clients, setClients] = useState([
    {
      id: 24,
      name: "Unit Sales NBD Process FMS",
      type: "Unit Sales NBD Process FMS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1_lC6UeiQkyxwr1Xa_RC4ixYue2CYPCmUN5PL47_W-vk/edit?gid=0#gid=0",
      url: "",
      email: "*********",
      password: "*********",
    },
    {
      id: 36,
      name: "Signature Heritage PMS",
      type: "Signature Heritage PMS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1Occ9XeiwKCAY9PhgN6j3h3zc1qcsc6vpasZZcCtW8b0/edit?gid=1959215837#gid=1959215837",
      Report: "https://lookerstudio.google.com/u/0/reporting/71f55c5c-959f-4d5d-b0c7-dca8c6e38418/page/p_xrqaqwn5wd",
      url: "https://script.google.com/macros/s/AKfycbx0jLN_KbL4APHn0ue-yhF4Ts3tl3PrybP__IFfP1Pe/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 39,
      name: "Ahuja Ji Site",
      type: "Ahuja Ji Site",
      viewUrl: "https://docs.google.com/spreadsheets/d/1n2kmlT8VES2N9jkWoI9zJGVKGOLhBr7-Hf105vinCWo/edit?gid=1959215837#gid=1959215837",
      Report: "https://lookerstudio.google.com/u/0/reporting/71f55c5c-959f-4d5d-b0c7-dca8c6e38418/page/p_xrqaqwn5wd",
      url: "https://script.google.com/macros/s/AKfycbx0jLN_KbL4APHn0ue-yhF4Ts3tl3PrybP__IFfP1Pe/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 8,
      name: "LMS",
      type: "LMS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1TrVmgLED33DIHqzXmMzpThTh2UpO9jKIym2p4wERVgk/edit?gid=1219534514#gid=1219534514",
      url: "https://script.google.com/a/macros/vipinchauhanassociates.com/s/AKfycbyoGdGzQPX0_ItUEFDdhgVmPqZnkMSVieLu0GhwjOA/dev",
      Report: "https://lookerstudio.google.com/u/0/reporting/dfdb72a9-b94f-4b1e-9c44-0d90d2da68aa/page/TKYhF",
      email: "*********",
      password: "*******",
    },
    {
      id: 14,
      name: "MIS Scoring",
      type: "MIS Scoring",
      Report: "https://lookerstudio.google.com/u/0/reporting/e62e940b-02e6-45b0-ab6d-be1f6ba821a2",
      email: "*********",
      password: "*********",
    },
    {
      id: 15,
      name: "Purchase",
      type: "Purchase",
      viewUrl: "https://docs.google.com/spreadsheets/d/1nydtRGls9RpJa4snkl-DZm9hH924A1GCScovLoXuczI/edit?gid=90802379#gid=90802379",
      url: "https://purchase-project-theta.vercel.app/",
      email: "nandu@gmail.com",
      password: "nandu@123",
    },
    {
      id: 9,
      name: "Curing FMS",
      type: "Curing FMS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1dwMIULFStXva8YMCRHj05Lq36ApAEca55GO2Mcwl1Iw/edit?gid=663292535#gid=663292535",
      url: "https://script.google.com/a/macros/vipinchauhanassociates.com/s/AKfycbwYsE7w3Q41Ms2SCe8JepyAx3TerwGJpLmlBYuouQbXHeIeb1c7Wj025dlT4U0LeR3Q/exec",
      email: "*********",
      password: "Bharti Dhote@123",
    },
    {
      id: 1,
      name: "Help Ticket",
      type: "Help Ticket",
      viewUrl: "https://docs.google.com/spreadsheets/d/16lRhV_M1EjlZysy4KtnqIEiR3s4f213-IrJVRu6AMTM/edit?gid=1810059144#gid=1810059144",
      url: "https://script.google.com/macros/s/AKfycbxTihDgQb6IXLRvbJMEJZRavhCoDCMdLOoobc4texHL/dev",
      email: "***",
      password: "****",
    },
    {
      id: 10,
      name: "Recruitment",
      type: "Recruitment",
      viewUrl: "https://docs.google.com/spreadsheets/d/1-QtfcRcZbwmweOzg50Bg1m5NiJNKNh9un7AdWYUWONQ/edit?usp=sharing",
      url: "",
      email: "********",
      password: "*******",
    },
    {
      id: 11,
      name: "WALK-IN INTERVIEW",
      type: "WALK-IN INTERVIEW",
      viewUrl: "https://docs.google.com/spreadsheets/d/18f1UHVWlmQnxFw93cDHgeE9_17PmXAeSuv_Rutgdndo/edit?usp=sharing",
      url: "",
      email: "********",
      password: "*******",
    },
    {
      id: 2,
      name: "Office Checklist",
      type: "Office Checklist",
      viewUrl: "https://docs.google.com/spreadsheets/u/0/d/1MLHdR_vJTCKIvEAQUa0m--6in3joxDa2L1PVQcp1dyk/edit",
      url: "https://script.google.com/a/vipinchauhanassociates.com/macros/s/AKfycbw_zZh5RcLjPuhRvqfsJJSLwCzmcWUTMXfiZ4JZFFQs/dev",
      email: "Bharti Dhote",
      password: "Bharti Dhote@123",
    },
    {
      id: 3,
      name: "Site Checklist",
      type: "Site Checklist",
      viewUrl: "https://docs.google.com/spreadsheets/d/1l-2S_2U1iZTj1Et5F7LB6DpqVEX0UgSGrQvCcQ10Unw/edit?gid=2092959791#gid=2092959791",
      url: "https://script.google.com/a/vipinchauhanassociates.com/macros/s/AKfycbw_zZh5RcLjPuhRvqfsJJSLwCzmcWUTMXfiZ4JZFFQs/dev",
      email: "Bharti Dhote",
      password: "Bharti Dhote@123",
    },
    {
      id: 4,
      name: "Housekeeping Checklist",
      type: "Housekeeping Checklist",
      viewUrl: "https://docs.google.com/spreadsheets/d/1nPoGBbFyayo5b_pX2GT4gyff7zlJjY0hZ2iTM02cqtI/edit?gid=541354850#gid=541354850",
      url: "https://script.google.com/a/vipinchauhanassociates.com/macros/s/AKfycbw_zZh5RcLjPuhRvqfsJJSLwCzmcWUTMXfiZ4JZFFQs/dev",
      email: "Bharti Dhote",
      password: "Bharti Dhote@123",
    },
    {
      id: 5,
      name: "Pc Follow-up Checklist",
      type: "Pc Follow-up Checklist",
      viewUrl: "https://docs.google.com/spreadsheets/d/1iwb6Gc1ZWtyW2Wlkj6NwghFP5vuUDcAsqvxaaUYG1XE/edit?gid=541354850#gid=541354850",
      url: "https://script.google.com/a/vipinchauhanassociates.com/macros/s/AKfycbw_zZh5RcLjPuhRvqfsJJSLwCzmcWUTMXfiZ4JZFFQs/dev",
      email: "Bharti Dhote",
      password: "Bharti Dhote@123",
    },
    {
      id: 6,
      name: "CSM Help Ticket",
      type: "CSM Help Ticket",
      viewUrl: "https://docs.google.com/spreadsheets/d/1YKdpOWXTcSqyeiD61qmG-lrEiXll1Wnk8WphigFaLzo/edit?usp=sharing",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSc98lxUcxVpLd1tY8NeHkMToA4U5r0XBHiGkNvaRdvTmr1k6A/viewform?usp=header",
      email: "*********",
      password: "Bharti Dhote@123",
    },
    {
      id: 7,
      name: "Contracter Help Ticket",
      type: "Contracter Help Ticket",
      viewUrl: "https://docs.google.com/spreadsheets/d/1iwb6Gc1ZWtyW2Wlkj6NwghFP5vuUDcAsqvxaaUYG1XE/edit?gid=541354850#gid=541354850",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSc98lxUcxVpLd1tY8NeHkMToA4U5r0XBHiGkNvaRdvTmr1k6A/viewform?usp=header",
      email: "*********",
      password: "Bharti Dhote@123",
    },
    {
      id: 12,
      name: "Training Dash Module",
      type: "Training Dash Module",
      viewUrl: "https://docs.google.com/spreadsheets/d/1H2b7c6btaBVk2_blf6D4Zkks-8kqw9FNH9kquNultBs/edit?gid=897428392#gid=897428392",
      url: "",
      email: "*********",
      password: "Bharti Dhote@123",
    },
    {
      id: 13,
      name: "Rajeev Abott Site",
      type: "Rajeev Abott Site",
      viewUrl: "https://docs.google.com/spreadsheets/d/1wh6OWNrQfcQx0075BDyJs_Ao_2UTrP5wG6Wk-gU6fmM/edit?gid=1959215837#gid=1959215837",
      url: "https://script.google.com/a/macros/vipinchauhanassociates.com/s/AKfycbx0jLN_KbL4APHn0ue-yhF4Ts3tl3PrybP__IFfP1Pe/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 16,
      name: "Scope Clg New Building",
      type: "Scope Clg New Building",
      viewUrl: "https://docs.google.com/spreadsheets/d/1x9bMQwNy1G5_mCMXikRqnutGxjnQZvYvuzjLLASnuks/edit?gid=1885408588#gid=1885408588",
      url: "https://script.google.com/a/macros/vipinchauhanassociates.com/s/AKfycbx0jLN_KbL4APHn0ue-yhF4Ts3tl3PrybP__IFfP1Pe/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 17,
      name: "After Service Checklist",
      type: "After Service Checklist",
      viewUrl: "https://docs.google.com/spreadsheets/d/18Nejx9kbnfwsoyu_shvgu9qtfg3JJW3ijMwU69fHb_M/edit?gid=541354850#gid=541354850",
      url: "",
      email: "*********",
      password: "*********",
    },
    {
      id: 18,
      name: "CCR MIS Report",
      type: "CCR MIS Report",
      viewUrl: "",
      Report: "https://lookerstudio.google.com/u/0/reporting/3ec6246c-94cf-4860-842f-97cc8a503ecc/page/oSUSF",
      email: "*********",
      password: "*********",
    },
    {
      id: 19,
      name: "PC Call Tracker",
      type: "PC Call Tracker",
      viewUrl: "",
      Report: "https://lookerstudio.google.com/u/0/reporting/e6bda6de-c282-456f-9c83-f81986f28c6d/page/NMbSF",
      email: "*********",
      password: "*********",
    },
    {
      id: 20,
      name: "Runo",
      type: "Runo",
      viewUrl: "",
      url: "https://web.runo.in/call/logs/",
      email: "*********",
      password: "*********",
    },
    {
      id: 21,
      name: "Attendance RCC",
      type: "Attendance RCC",
      viewUrl: "https://docs.google.com/spreadsheets/d/1dhBeug4cFH-V-L8BX4AZL9hRtBYOIcfSx-y4aNns16E/edit?gid=674075562#gid=674075562",
      url: "https://web.runo.in/call/logs/",
      email: "*********",
      password: "*********",
    },
    {
      id: 22,
      name: "Monthly Performance RCC",
      type: "Monthly Performance RCC",
      viewUrl: "https://docs.google.com/spreadsheets/d/1InL9YRkfXXeafP-WtkpZPP5OqZSn19_RlSJYr0avZdU/edit?gid=674075562#gid=674075562",
      url: "https://web.runo.in/call/logs/",
      email: "*********",
      password: "*********",
    },
    {
      id: 23,
      name: "FDE Attendance",
      type: "FDE Attendance",
      viewUrl: "https://docs.google.com/spreadsheets/d/1qn3THEhBQom22HIGS38z_AqQ24vks_yjzi4dQ-Lb21s/edit?gid=674075562#gid=674075562",
      url: "https://web.runo.in/call/logs/",
      email: "*********",
      password: "*********",
    },
    {
      id: 25,
      name: "Unit Sale ECS",
      type: "Unit Sale ECS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1eVil_zRMQgdMFxq9N17m2pMQ_JYMFJTwt_0uWuG_EC4/edit?gid=1758523778#gid=1758523778",
      url: "https://script.google.com/macros/s/AKfycbxRWeACKvKBN0mQ0l-udlxrCXh0kOsjFTLR0qmKk_AA/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 28,
      name: "Maintenance Checklist",
      type: "Maintenance Checklist",
      viewUrl: "https://docs.google.com/spreadsheets/d/18Nejx9kbnfwsoyu_shvgu9qtfg3JJW3ijMwU69fHb_M/edit?gid=541354850#gid=541354850",
      url: "",
      email: "*********",
      password: "*********",
    },
    {
      id: 29,
      name: "Madhav Gupta ji (B block Harvinder ji)",
      type: "Madhav Gupta ji (B block Harvinder ji)",
      viewUrl: "https://docs.google.com/spreadsheets/d/1aoIssbHjcFgElAVWYLYD7-zctiFE8Q3FL9NxGMAyd_0/edit?gid=638303233#gid=638303233",
      url: "https://script.google.com/a/macros/vipinchauhanassociates.com/s/AKfycbx0jLN_KbL4APHn0ue-yhF4Ts3tl3PrybP__IFfP1Pe/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 30,
      name: "Madhav Gupta ji (C block Falcon)",
      type: "Madhav Gupta ji (C block Falcon)",
      viewUrl: "https://docs.google.com/spreadsheets/d/1zI9k1yYYMlsrgGLmt8LlknFWFgrUxLi_2J--sxvaeC4/edit?gid=638303233#gid=638303233",
      url: "https://script.google.com/a/macros/vipinchauhanassociates.com/s/AKfycbx0jLN_KbL4APHn0ue-yhF4Ts3tl3PrybP__IFfP1Pe/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 31,
      name: "Madhav Gupta (D block Ramiya)",
      type: "Madhav Gupta (D block Ramiya)",
      viewUrl: "https://docs.google.com/spreadsheets/u/8/d/1_m4xgsRNs4fygv_9LeA-Qofg1ayQhTnJ6uRlzdxYyk0/edit?ouid=117146367390946380700&usp=sheets_home&ths=true",
      url: "https://script.google.com/a/macros/vipinchauhanassociates.com/s/AKfycbx0jLN_KbL4APHn0ue-yhF4Ts3tl3PrybP__IFfP1Pe/dev",
      email: "*********",
      password: "*********",
    },
    {
      id: 32,
      name: "Scope IMS",
      type: "Scope IMS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1HeenGXwOwMmgr2up7sSzQtDkWEsXsmgIjq7QPZh8MW4/edit?gid=1495304822#gid=1495304822",
      Report: "https://lookerstudio.google.com/u/0/reporting/066b0798-3066-477b-b41f-0d89673d1e58/page/gj5XF",
      email: "*********",
      password: "*********",
    },
    {
      id: 33,
      name: "Rajeev Abbott IMS",
      type: "Rajeev Abbott IMS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1fSK9suXKI5gai4Vl43gDPyLnyZzg_FENtiUe0DDcGQ8/edit?gid=0#gid=0",
      url: "",
      email: "*********",
      password: "*********",
    },
    {
      id: 34,
      name: "Dubey ji IMS",
      type: "Dubey ji IMS",
      viewUrl: "https://docs.google.com/spreadsheets/d/1veCXOTOpp089UzYQ_EiDI8Ag5ZFja-U1BlROEdRHZPc/edit?usp=drive_link",
      url: "",
      email: "*********",
      password: "*********",
    },
    {
      id: 35,
      name: "Dr. Shirkant Jain",
      type: "Dr. Shirkant Jain",
      viewUrl: "https://docs.google.com/spreadsheets/d/1fLhnNaBH-yNLPrxDiWplrLI3Dt9zg294sZFYBO4SOnw/edit?usp=drive_link",
      url: "",
      email: "*********",
      password: "*********",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedItems, setCopiedItems] = useState({});
  const [showHeader, setShowHeader] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    type: "Main Client",
    viewUrl: "",
    url: "",
    Report: "",
    email: "",
    password: "",
  });

  const clientCardsSectionRef = useRef(null);

const showcaseItems = [
    {
      img: "/scrolling1.jpeg",
      title: "RNTU College",
      desc: "Complete project management system with real-time tracking, Google Sheets integration aur FMS dashboard",
    },
    {
      img: "/scrolling2.jpeg",
      title: "Scope College New Building",
      desc: "Advanced construction monitoring with PMS/IMS, resource allocation, MIS scoring aur live dashboards",
    },
    {
      img: "/scrolling3.jpeg",
      title: "Ultimate Heights",
      desc: "RCC site management with call tracking, attendance, expenses approval aur Google Apps Script automation",
    },
    {
      img: "/scrolling4.jpeg",
      title: "Seamless Collaboration",
      desc: "Team CRM with Exotel calls, Agora recording, PDF invoices aur MongoDB backend for Bhopal projects",
    },
    {
      img: "/scrolling5.jpeg",
      title: "Smart Analytics",
      desc: "Looker Studio MIS dashboards, training LMS, recruitment FMS aur performance metrics for VIPIN projects",
    },
  ];


  const quickAccessItems = [
    {
      id: "cp-commission-image",
      title: "CP Commission (Image)",
      type: "Image",
      icon: <ImageIcon size={22} />,
      gradient: "from-orange-100 to-orange-200",
      hoverGradient: "from-orange-200 to-orange-300",
      textColor: "text-orange-900",
      onClick: () => alert("Image would open here"),
    },
    {
      id: "cp-commission-pdf",
      title: "CP Commission (PDF)",
      type: "PDF",
      icon: <FileText size={22} />,
      gradient: "from-indigo-100 to-indigo-200",
      hoverGradient: "from-indigo-200 to-indigo-300",
      textColor: "text-indigo-900",
      onClick: () => alert("PDF would open here"),
    },
    {
      id: "em-meeting",
      title: "EM Meeting Video",
      type: "Video",
      icon: <Film size={22} />,
      gradient: "from-sky-100 to-blue-200",
      hoverGradient: "from-sky-200 to-blue-300",
      textColor: "text-blue-900",
      url: "https://www.youtube.com/watch?v=5p7t2rjJCRA",
    },
    {
      id: "safety-video",
      title: "Safety Video",
      type: "Video",
      icon: <Film size={22} />,
      gradient: "from-rose-100 to-rose-200",
      hoverGradient: "from-rose-200 to-rose-300",
      textColor: "text-rose-900",
      url: "https://www.youtube.com/watch?v=IfLtnM6qqxM",
    },
  ];

  const filteredClients = useMemo(() => {
    if (!globalSearch.trim()) return clients;
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        client.type.toLowerCase().includes(globalSearch.toLowerCase())
    );
  }, [clients, globalSearch]);

  // Auto scroll when typing in search
  useEffect(() => {
    if (globalSearch.trim().length > 0) {
      const timer = setTimeout(() => {
        clientCardsSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [globalSearch]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % showcaseItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      setShowHeader(scrollTop <= lastScrollTop || scrollTop < 50);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEdit = (client) => {
    setFormData({ ...client });
    setEditingId(client.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Kya "${clients.find((c) => c.id === id)?.name}" delete karna hai?`)) {
      setClients(clients.filter((c) => c.id !== id));
    }
  };

  const togglePassword = (id) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, id, type) => {
    navigator.clipboard.writeText(text);
    const key = `${id}-${type}`;
    setCopiedItems((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setCopiedItems((prev) => ({ ...prev, [key]: false })), 2000);
  };

  const getTypeStyles = (type) => {
    const styles = {
      "Office Checklist": "bg-gradient-to-br from-blue-500 to-cyan-600",
      "Site Checklist": "bg-gradient-to-br from-violet-500 to-purple-600",
      "Housekeeping Checklist": "bg-gradient-to-br from-emerald-500 to-teal-600",
      "Pc Follow-up Checklist": "bg-gradient-to-br from-pink-500 to-rose-600",
      "CSM Help Ticket": "bg-gradient-to-br from-orange-500 to-red-600",
      "Contracter Help Ticket": "bg-gradient-to-br from-amber-500 to-yellow-600",
      "Training Dash Module": "bg-gradient-to-br from-indigo-500 to-blue-600",
      LMS: "bg-gradient-to-br from-fuchsia-500 to-purple-600",
      "Curing FMS": "bg-gradient-to-br from-teal-500 to-green-600",
      Recruitment: "bg-gradient-to-br from-lime-500 to-emerald-600",
      "WALK-IN INTERVIEW": "bg-gradient-to-br from-cyan-500 to-sky-600",
      "Rajeev Abott Site": "bg-gradient-to-br from-rose-500 to-pink-600",
      "Scope Clg New Building": "bg-gradient-to-br from-purple-500 to-indigo-600",
      "MIS Scoring": "bg-gradient-to-br from-red-500 to-orange-600",
      "After Service Checklist": "bg-gradient-to-br from-green-500 to-emerald-600",
      "CCR MIS Report": "bg-gradient-to-br from-yellow-500 to-amber-600",
      "PC Call Tracker": "bg-gradient-to-br from-indigo-500 to-purple-600",
      Runo: "bg-gradient-to-br from-teal-500 to-cyan-600",
      "Attendance RCC": "bg-gradient-to-br from-pink-500 to-red-600",
      "Monthly Performance RCC": "bg-gradient-to-br from-lime-500 to-green-600",
      "FDE Attendance": "bg-gradient-to-br from-orange-500 to-amber-600",
      "Unit Sales NBD Process FMS": "bg-gradient-to-br from-blue-500 to-indigo-600",
      "Unit Sale ECS": "bg-gradient-to-br from-rose-500 to-fuchsia-600",
      "Maintenance Checklist": "bg-gradient-to-br from-emerald-500 to-lime-600",
      "Madhav Gupta ji (B block Harvinder ji)": "bg-gradient-to-br from-purple-500 to-violet-600",
      "Madhav Gupta ji (C block Falcon)": "bg-gradient-to-br from-indigo-500 to-blue-600",
      "Madhav Gupta (D block Ramiya)": "bg-gradient-to-br from-fuchsia-500 to-pink-600",
      "Scope IMS": "bg-gradient-to-br from-green-500 to-teal-600",
      "Rajeev Abbott IMS": "bg-gradient-to-br from-amber-500 to-orange-600",
      "Dubey ji IMS": "bg-gradient-to-br from-sky-500 to-cyan-600",
      "Dr. Shirkant Jain": "bg-gradient-to-br from-rose-500 to-red-600",
      "Signature Heritage PMS": "bg-gradient-to-br from-yellow-500 to-lime-600",
      "Ahuja Ji Site": "bg-gradient-to-br from-purple-500 to-pink-600",
    };
    return styles[type] || "bg-gradient-to-br from-gray-500 to-gray-600";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { rootMargin: "-50px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredClients]);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 120px;
        }
        body {
          overscroll-behavior: none;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.4);
          border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto p-4 md:p-8 relative z-10">
          <div className={`transition-all duration-500 ease-out ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"} mb-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-lg shadow-purple-400/30">
                    <Sparkles size={32} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
                      HOW WE WORK
                    </h1>
                    <p className="text-slate-600 text-sm">
                      All your resources in one beautiful dashboard ✨ | Total: {clients.length} Clients
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  if (!showForm) {
                    setEditingId(null);
                    setFormData({
                      name: "",
                      type: "Main Client",
                      viewUrl: "",
                      url: "",
                      Report: "",
                      email: "",
                      password: "",
                    });
                  }
                }}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl transition-all shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:scale-105 active:scale-95 font-bold"
              >
                <Plus size={24} className="group-hover:rotate-90 transition-transform" /> Add New Client
              </button>
            </div>
          </div>

          <div className="mb-12">
            <div className="relative w-full group showcase-carousel">
              <div className="relative h-96 overflow-hidden rounded-3xl bg-black shadow-2xl">
                <img
                  src={showcaseItems[currentSlide].img}
                  alt={showcaseItems[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {showcaseItems[currentSlide].title}
                  </h3>
                  <p className="text-white/90 text-lg drop-shadow-md max-w-2xl leading-relaxed">
                    {showcaseItems[currentSlide].desc}
                  </p>
                  <div className="mt-6 inline-flex">
                    <div className="h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full w-24"></div>
                  </div>
                </div>
                <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-110 active:scale-95 opacity-60 group-hover:opacity-100">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30 hover:scale-110 active:scale-95 opacity-60 group-hover:opacity-100">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-semibold border border-white/30">
                  {currentSlide + 1} / {showcaseItems.length}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {showcaseItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-gradient-to-r from-purple-500 to-pink-500 w-8" : "bg-slate-300 hover:bg-slate-400 w-2.5"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12 px-4 md:px-0">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <LinkIcon size={28} /> Quick Access
            </h2>
            <div className="flex flex-wrap justify-start gap-4 md:gap-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
              {quickAccessItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.url ? window.open(item.url, "_blank") : item.onClick?.()}
                  className={`group relative flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl min-w-[220px] md:min-w-[240px] transition-all duration-400 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-white/60 shadow-lg overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} group-hover:bg-gradient-to-br ${item.hoverGradient} transition-all duration-500`}></div>
                  <div className="relative z-10 p-3 bg-white/70 rounded-xl group-hover:bg-white/90 transition-all">
                    {item.icon}
                  </div>
                  <div className="relative z-10 text-left">
                    <p className={`font-bold ${item.textColor}`}>{item.title}</p>
                    <p className="text-sm text-slate-700 flex items-center gap-1 mt-1">
                      <ExternalLink size={14} />
                      {item.type === "Image" ? "View Image" : item.type === "PDF" ? "Open PDF" : "Watch Video"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showForm && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-10 border border-purple-200">
              <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {editingId ? "✏️ Update Client Details" : "➕ Add New Client"}
              </h2>
              <div className="text-center text-slate-500">
                Form fields placeholder (Add your form inputs here)
              </div>
            </div>
          )}

          <div ref={clientCardsSectionRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 scroll-reveal-container">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="scroll-reveal group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-200 p-6 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-300/40 transition-all duration-300 hover:-translate-y-3"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-purple-300/20 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-5">
                      <span className={`text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-xl text-white shadow-lg ${getTypeStyles(client.type)}`}>
                        {client.type}
                      </span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleEdit(client)} className="p-2.5 text-slate-400 hover:text-purple-600 hover:bg-purple-100 rounded-xl transition-all" title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(client.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all" title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 line-clamp-2">
                      {client.name}
                    </h3>

                    <div className="space-y-3 mb-6">
                      {client.email && client.email.trim() !== "" && (
                        <div className="flex items-center gap-3 text-sm bg-blue-50 p-3.5 rounded-xl border border-blue-200 group/item hover:border-blue-400 transition-all">
                          <Mail size={16} className="text-blue-500 flex-shrink-0" />
                          <span className="truncate flex-1 text-slate-700 font-medium">
                            {client.email.includes("*") ? "•••••••••••••" : client.email}
                          </span>
                          {!client.email.includes("*") && (
                            <button
                              onClick={() => copyToClipboard(client.email, client.id, "email")}
                              className="p-1.5 hover:bg-blue-100 rounded-lg transition-all opacity-0 group-hover/item:opacity-100"
                              title="Copy Email"
                            >
                              {copiedItems[`${client.id}-email`] ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-slate-500" />}
                            </button>
                          )}
                        </div>
                      )}

                      {client.password && client.password.trim() !== "" && (
                        <div className="flex items-center gap-3 text-sm bg-purple-50 p-3.5 rounded-xl border border-purple-200 group/item hover:border-purple-400 transition-all">
                          <Lock size={16} className="text-purple-500 flex-shrink-0" />
                          <span className="font-mono text-slate-700 font-semibold flex-1">
                            {showPasswords[client.id]
                              ? client.password.includes("*") ? "•••••••••••••" : client.password
                              : "••••••••"}
                          </span>
                          {!client.password.includes("*") && (
                            <>
                              <button onClick={() => togglePassword(client.id)} className="p-1.5 hover:bg-purple-100 rounded-lg transition-all" title="Toggle Password">
                                {showPasswords[client.id] ? <EyeOff size={14} className="text-slate-500" /> : <Eye size={14} className="text-slate-500" />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(client.password, client.id, "password")}
                                className="p-1.5 hover:bg-purple-100 rounded-lg transition-all"
                                title="Copy Password"
                              >
                                {copiedItems[`${client.id}-password`] ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-slate-500" />}
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {client.viewUrl ? (
                        <a href={client.viewUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-500 hover:to-pink-500 text-purple-700 hover:text-white text-sm font-bold py-3.5 rounded-xl transition-all border border-purple-300 hover:border-transparent shadow-md hover:shadow-lg">
                          <ExternalLink size={16} /> View Sheet
                        </a>
                      ) : (
                        <button disabled className="flex items-center justify-center gap-2 bg-slate-100 text-slate-400 text-sm font-medium py-3.5 rounded-xl border border-slate-200 cursor-not-allowed opacity-60">
                          <ExternalLink size={16} /> No Sheet
                        </button>
                      )}

                      {client.Report ? (
                        <a href={client.Report} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-500 hover:to-amber-500 text-orange-700 hover:text-white text-sm font-bold py-3.5 rounded-xl transition-all border border-orange-300 hover:border-transparent shadow-md hover:shadow-lg">
                          <ExternalLink size={16} /> Report
                        </a>
                      ) : (
                        <div></div>
                      )}

                      {client.url ? (
                        <a href={client.url} target="_blank" rel="noopener noreferrer" className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-400 hover:to-slate-500 text-slate-700 hover:text-white text-sm font-bold py-3.5 rounded-xl transition-all border border-slate-300 hover:border-slate-500 shadow-md hover:shadow-lg">
                          <Globe size={16} /> Script URL
                        </a>
                      ) : (
                        <button disabled className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 bg-slate-100 text-slate-400 text-sm font-medium py-3.5 rounded-xl border border-slate-200 cursor-not-allowed opacity-60">
                          <Globe size={16} /> No URL
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredClients.length === 0 && globalSearch && (
              <div className="text-center py-24 bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-purple-300">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-slate-600 font-semibold text-xl">
                  No clients found for "{globalSearch}"
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Try searching "MIS", "RCC", "IMS" ya "PMS"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;