const customersData = [
  {
    id: 1,
    fullName: "Nguyen Van An",
    email: "an.nguyen@email.com",
    phone: "0901 234 567",
    status: "Interested",
    source: "Facebook Ads",
    lastContact: "2026-03-26",
    nextFollowUp: "2026-03-28",
    address: "Thu Duc, Ho Chi Minh City",
    estimatedValue: 12500000,
    notes:
      "Customer is interested in bulk purchase and asked about shipping policy, final quotation, and discount options for repeat orders.",
    interactions: [
      { date: "2026-03-26", type: "Phone Call", content: "Discussed pricing and delivery timeline." },
      { date: "2026-03-25", type: "Zalo Message", content: "Sent product catalog and sample photos." },
      { date: "2026-03-23", type: "Initial Inquiry", content: "Customer submitted contact form after seeing Facebook campaign." }
    ]
  },
  {
    id: 2,
    fullName: "Le Minh Trang",
    email: "trang.le@email.com",
    phone: "0938 998 889",
    status: "Contacted",
    source: "Website Form",
    lastContact: "2026-03-25",
    nextFollowUp: "2026-03-29",
    address: "Binh Thanh, Ho Chi Minh City",
    estimatedValue: 8300000,
    notes: "Customer requested a quote and product comparison before making decision.",
    interactions: [
      { date: "2026-03-25", type: "Email", content: "Sent price quote and product details." },
      { date: "2026-03-24", type: "Phone Call", content: "Confirmed customer requirements." }
    ]
  },
  {
    id: 3,
    fullName: "Tran Gia Huy",
    email: "huy.tran@email.com",
    phone: "0987 741 258",
    status: "New",
    source: "Zalo",
    lastContact: "2026-03-24",
    nextFollowUp: "2026-03-27",
    address: "District 7, Ho Chi Minh City",
    estimatedValue: 4500000,
    notes: "New lead asking for latest catalog and delivery fee.",
    interactions: [
      { date: "2026-03-24", type: "Zalo Message", content: "Asked for product list and shipping fee." }
    ]
  },
  {
    id: 4,
    fullName: "Pham Thu Ha",
    email: "ha.pham@email.com",
    phone: "0977 563 114",
    status: "Purchased",
    source: "Instagram",
    lastContact: "2026-03-21",
    nextFollowUp: "2026-04-03",
    address: "Go Vap, Ho Chi Minh City",
    estimatedValue: 9800000,
    notes: "Existing buyer, suitable for repeat-purchase promotion.",
    interactions: [
      { date: "2026-03-21", type: "Purchase", content: "Completed order #CR-2045." },
      { date: "2026-03-20", type: "Instagram Message", content: "Confirmed product color and quantity." }
    ]
  },
  {
    id: 5,
    fullName: "Do Quoc Khanh",
    email: "khanh.do@email.com",
    phone: "0914 700 116",
    status: "Inactive",
    source: "Old Customer",
    lastContact: "2026-03-14",
    nextFollowUp: "2026-04-05",
    address: "Tan Phu, Ho Chi Minh City",
    estimatedValue: 6200000,
    notes: "Old customer who has not responded recently.",
    interactions: [
      { date: "2026-03-14", type: "Phone Call", content: "No answer from customer." },
      { date: "2026-03-10", type: "SMS", content: "Sent reminder message." }
    ]
  }
];

const tasksData = [
  {
    id: 1,
    title: "Tôn Quang Duy",
    description: "Confirm final quotation and delivery schedule.",
    dueDate: "2026-03-28",
    stage: "To Do",
    customerId: 1,
    customerStatus: "Interested"
  },
  {
    id: 2,
    title: "Send catalog to Tran Gia Huy",
    description: "Customer asked for a new product list via Zalo.",
    dueDate: "2026-03-28",
    stage: "To Do",
    customerId: 3,
    customerStatus: "New"
  },
  {
    id: 3,
    title: "Prepare discount offer",
    description: "Create repeat-customer voucher for Nguyễn Phước Thịnh.",
    dueDate: "2026-03-29",
    stage: "In Progress",
    customerId: 4,
    customerStatus: "Purchased"
  },
  {
    id: 4,
    title: "Check inactive customers",
    description: "Review old contacts and choose recovery list.",
    dueDate: "2026-03-30",
    stage: "In Progress",
    customerId: 5,
    customerStatus: "Inactive"
  },
  {
    id: 5,
    title: "Follow-up Le Minh Trang",
    description: "Sent product quote and recorded customer feedback.",
    dueDate: "2026-03-27",
    stage: "Done",
    customerId: 2,
    customerStatus: "Contacted"
  },
  {
    id: 6,
    title: "Update lead source report",
    description: "Adjusted weekly dashboard note for campaign review.",
    dueDate: "2026-03-27",
    stage: "Done",
    customerId: null,
    customerStatus: "Internal"
  }
];