const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const now = new Date();
const daysFromNow = (days) => {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date;
};
const isoDaysFromNow = (days) => daysFromNow(days).toISOString();

const seedUsers = [
  {
    _id: "demo-admin",
    id: "demo-admin",
    name: "Demo Admin",
    email: "admin123@gmail.com",
    phone: "9999999999",
    role: "admin",
    isActive: true,
    password: "Admin@123",
  },
  {
    _id: "staff-amit",
    id: "staff-amit",
    name: "Amit Verma",
    email: "amit.collections@showcase.local",
    phone: "9876501101",
    role: "staff",
    isActive: true,
    password: "Staff@123",
  },
  {
    _id: "staff-priya",
    id: "staff-priya",
    name: "Priya Nair",
    email: "priya.collections@showcase.local",
    phone: "9876501102",
    role: "staff",
    isActive: true,
    password: "Staff@123",
  },
  {
    _id: "staff-rahul",
    id: "staff-rahul",
    name: "Rahul Khan",
    email: "rahul.collections@showcase.local",
    phone: "9876501103",
    role: "staff",
    isActive: false,
    password: "Staff@123",
  },
];

const seedCustomers = [
  {
    _id: "customer-1001",
    id: "customer-1001",
    fullName: "Ananya Sharma",
    phone: "9876542101",
    alternatePhone: "9876542102",
    aadhaar: "XXXX-XXXX-4581",
    address: { street: "42 Park Street", city: "Mumbai", state: "Maharashtra", pincode: "400001" },
    kycDocumentType: "Aadhaar",
    kycDocumentImage: null,
    createdBy: "demo-admin",
    createdAt: isoDaysFromNow(-150),
    updatedAt: isoDaysFromNow(-5),
  },
  {
    _id: "customer-1002",
    id: "customer-1002",
    fullName: "Rohit Mehta",
    phone: "9876542103",
    alternatePhone: null,
    aadhaar: "XXXX-XXXX-7822",
    address: { street: "17 C G Road", city: "Ahmedabad", state: "Gujarat", pincode: "380009" },
    kycDocumentType: "Voter ID",
    kycDocumentImage: null,
    createdBy: "staff-amit",
    createdAt: isoDaysFromNow(-132),
    updatedAt: isoDaysFromNow(-12),
  },
  {
    _id: "customer-1003",
    id: "customer-1003",
    fullName: "Meera Iyer",
    phone: "9876542104",
    alternatePhone: "9876542105",
    aadhaar: "XXXX-XXXX-3019",
    address: { street: "8 Lake View Road", city: "Bengaluru", state: "Karnataka", pincode: "560001" },
    kycDocumentType: "PAN",
    kycDocumentImage: null,
    createdBy: "staff-priya",
    createdAt: isoDaysFromNow(-96),
    updatedAt: isoDaysFromNow(-3),
  },
  {
    _id: "customer-1004",
    id: "customer-1004",
    fullName: "Kabir Singh",
    phone: "9876542106",
    alternatePhone: null,
    aadhaar: "XXXX-XXXX-9090",
    address: { street: "Sector 22 Market", city: "Chandigarh", state: "Punjab", pincode: "160022" },
    kycDocumentType: "DL",
    kycDocumentImage: null,
    createdBy: "staff-amit",
    createdAt: isoDaysFromNow(-78),
    updatedAt: isoDaysFromNow(-20),
  },
  {
    _id: "customer-1005",
    id: "customer-1005",
    fullName: "Fatima Khan",
    phone: "9876542107",
    alternatePhone: "9876542108",
    aadhaar: "XXXX-XXXX-6114",
    address: { street: "Banjara Hills", city: "Hyderabad", state: "Telangana", pincode: "500034" },
    kycDocumentType: "Aadhaar",
    kycDocumentImage: null,
    createdBy: "staff-priya",
    createdAt: isoDaysFromNow(-45),
    updatedAt: isoDaysFromNow(-2),
  },
  {
    _id: "customer-1006",
    id: "customer-1006",
    fullName: "Nikhil Kapoor",
    phone: "9876542109",
    alternatePhone: null,
    aadhaar: "XXXX-XXXX-2450",
    address: { street: "Civil Lines", city: "Jaipur", state: "Rajasthan", pincode: "302006" },
    kycDocumentType: "Aadhaar",
    kycDocumentImage: null,
    createdBy: "demo-admin",
    createdAt: isoDaysFromNow(-26),
    updatedAt: isoDaysFromNow(-1),
  },
  {
    _id: "customer-1007",
    id: "customer-1007",
    fullName: "Sana Qureshi",
    phone: "9876542110",
    alternatePhone: "9876542111",
    aadhaar: "XXXX-XXXX-7432",
    address: { street: "Hazratganj", city: "Lucknow", state: "Uttar Pradesh", pincode: "226001" },
    kycDocumentType: "Voter ID",
    kycDocumentImage: null,
    createdBy: "staff-amit",
    createdAt: isoDaysFromNow(-12),
    updatedAt: isoDaysFromNow(-1),
  },
  {
    _id: "customer-1008",
    id: "customer-1008",
    fullName: "Arjun Reddy",
    phone: "9876542112",
    alternatePhone: null,
    aadhaar: "XXXX-XXXX-1988",
    address: { street: "Anna Nagar", city: "Chennai", state: "Tamil Nadu", pincode: "600040" },
    kycDocumentType: "PAN",
    kycDocumentImage: null,
    createdBy: "staff-priya",
    createdAt: isoDaysFromNow(-4),
    updatedAt: isoDaysFromNow(-1),
  },
];

const seedLoans = [
  {
    _id: "loan-2001",
    id: "loan-2001",
    customerId: "customer-1001",
    productName: "iPhone 15 Pro",
    imeiNumber: "359881234567101",
    productPrice: 134900,
    loginCharge: 1500,
    downPayment: 34900,
    loanAmount: 101500,
    emiPlan: 12,
    monthlyEmi: 8458.33,
    purchaseDate: isoDaysFromNow(-180),
    createdBy: "staff-amit",
    createdAt: isoDaysFromNow(-180),
    updatedAt: isoDaysFromNow(-1),
    _seed: { firstDueOffset: -150, paid: 5, overdue: [6, 7], collectors: ["staff-amit", "staff-amit", "staff-priya"], modes: ["UPI", "Cash", "Bank Transfer"] },
  },
  {
    _id: "loan-2002",
    id: "loan-2002",
    customerId: "customer-1002",
    productName: "Samsung Galaxy S24 Ultra",
    imeiNumber: "359881234567102",
    productPrice: 124999,
    loginCharge: 1200,
    downPayment: 25000,
    loanAmount: 101199,
    emiPlan: 8,
    monthlyEmi: 12649.88,
    purchaseDate: isoDaysFromNow(-120),
    createdBy: "staff-priya",
    createdAt: isoDaysFromNow(-120),
    updatedAt: isoDaysFromNow(-8),
    _seed: { firstDueOffset: -92, paid: 2, overdue: [3, 4], collectors: ["staff-priya"], modes: ["Cash", "UPI"] },
  },
  {
    _id: "loan-2003",
    id: "loan-2003",
    customerId: "customer-1003",
    productName: "MacBook Air M3",
    imeiNumber: "359881234567103",
    productPrice: 114900,
    loginCharge: 1000,
    downPayment: 44900,
    loanAmount: 71000,
    emiPlan: 6,
    monthlyEmi: 11833.33,
    purchaseDate: isoDaysFromNow(-95),
    createdBy: "staff-priya",
    createdAt: isoDaysFromNow(-95),
    updatedAt: isoDaysFromNow(-4),
    _seed: { firstDueOffset: -65, paid: 3, overdue: [], collectors: ["staff-priya", "staff-amit"], modes: ["UPI", "Bank Transfer"] },
  },
  {
    _id: "loan-2004",
    id: "loan-2004",
    customerId: "customer-1004",
    productName: "Dell Inspiron 15",
    imeiNumber: "359881234567104",
    productPrice: 68999,
    loginCharge: 700,
    downPayment: 18000,
    loanAmount: 51699,
    emiPlan: 6,
    monthlyEmi: 8616.5,
    purchaseDate: isoDaysFromNow(-220),
    createdBy: "staff-amit",
    createdAt: isoDaysFromNow(-220),
    updatedAt: isoDaysFromNow(-35),
    _seed: { firstDueOffset: -190, paid: 6, overdue: [], collectors: ["staff-amit", "staff-priya"], modes: ["Cash", "UPI"] },
  },
  {
    _id: "loan-2005",
    id: "loan-2005",
    customerId: "customer-1005",
    productName: "OnePlus 12",
    imeiNumber: "359881234567105",
    productPrice: 64999,
    loginCharge: 800,
    downPayment: 14999,
    loanAmount: 50800,
    emiPlan: 8,
    monthlyEmi: 6350,
    purchaseDate: isoDaysFromNow(-58),
    createdBy: "staff-priya",
    createdAt: isoDaysFromNow(-58),
    updatedAt: isoDaysFromNow(-2),
    _seed: { firstDueOffset: -28, paid: 1, overdue: [], collectors: ["staff-priya"], modes: ["UPI"] },
  },
  {
    _id: "loan-2006",
    id: "loan-2006",
    customerId: "customer-1006",
    productName: "Sony Bravia 55 inch TV",
    imeiNumber: "359881234567106",
    productPrice: 72990,
    loginCharge: 900,
    downPayment: 12990,
    loanAmount: 60900,
    emiPlan: 12,
    monthlyEmi: 5075,
    purchaseDate: isoDaysFromNow(-28),
    createdBy: "demo-admin",
    createdAt: isoDaysFromNow(-28),
    updatedAt: isoDaysFromNow(-1),
    _seed: { firstDueOffset: 2, paid: 0, overdue: [], collectors: [], modes: [] },
  },
  {
    _id: "loan-2007",
    id: "loan-2007",
    customerId: "customer-1001",
    productName: "Apple Watch Ultra 2",
    imeiNumber: "359881234567107",
    productPrice: 89900,
    loginCharge: 800,
    downPayment: 29900,
    loanAmount: 60800,
    emiPlan: 6,
    monthlyEmi: 10133.33,
    purchaseDate: isoDaysFromNow(-38),
    createdBy: "staff-amit",
    createdAt: isoDaysFromNow(-38),
    updatedAt: isoDaysFromNow(-7),
    _seed: { firstDueOffset: -8, paid: 0, overdue: [1], collectors: [], modes: [] },
  },
  {
    _id: "loan-2008",
    id: "loan-2008",
    customerId: "customer-1007",
    productName: "HP Pavilion x360",
    imeiNumber: "359881234567108",
    productPrice: 82999,
    loginCharge: 900,
    downPayment: 20000,
    loanAmount: 63899,
    emiPlan: 8,
    monthlyEmi: 7987.38,
    purchaseDate: isoDaysFromNow(-12),
    createdBy: "staff-amit",
    createdAt: isoDaysFromNow(-12),
    updatedAt: isoDaysFromNow(-1),
    _seed: { firstDueOffset: 18, paid: 0, overdue: [], collectors: [], modes: [] },
  },
];

const createSeedInstallments = (loan) => {
  const paidCount = loan._seed?.paid || 0;
  const overdueNumbers = new Set(loan._seed?.overdue || []);
  const collectors = loan._seed?.collectors || ["staff-amit"];
  const modes = loan._seed?.modes || ["Cash"];
  const firstDueOffset = loan._seed?.firstDueOffset || 30;

  return Array.from({ length: loan.emiPlan }, (_, index) => {
    const emiNumber = index + 1;
    const dueDate = daysFromNow(firstDueOffset + index * 30);
    const isPaid = emiNumber <= paidCount;
    const isOverdue = overdueNumbers.has(emiNumber) || (!isPaid && dueDate < now);
    const collector = collectors[index % Math.max(collectors.length, 1)] || "demo-admin";

    return {
      _id: `installment-${loan.id}-${emiNumber}`,
      id: `installment-${loan.id}-${emiNumber}`,
      loanId: loan.id,
      customerId: loan.customerId,
      emiNumber,
      dueDate,
      amount: loan.monthlyEmi,
      status: isPaid ? "Paid" : isOverdue ? "Overdue" : "Pending",
      paidOn: isPaid ? isoDaysFromNow(firstDueOffset + index * 30 + 2) : null,
      collectedBy: isPaid ? collector : null,
      paymentMode: isPaid ? modes[index % Math.max(modes.length, 1)] || "Cash" : undefined,
      createdAt: loan.createdAt,
      updatedAt: isPaid ? isoDaysFromNow(firstDueOffset + index * 30 + 2) : isoDaysFromNow(-1),
    };
  });
};

const state = {
  users: seedUsers,
  customers: seedCustomers,
  loans: seedLoans,
  installments: seedLoans.flatMap(createSeedInstallments),
};

const toPublicUser = (user) => ({
  ...user,
  id: user.id || user._id,
  _id: user._id || user.id,
});

const toPublicCustomer = (customer) => ({
  ...customer,
  id: customer.id || customer._id,
  _id: customer._id || customer.id,
});

const toPublicLoan = (loan) => {
  const { _seed, ...rest } = loan;
  return {
    ...rest,
    id: rest.id || rest._id,
    _id: rest._id || rest.id,
  };
};

const toPublicInstallment = (installment) => ({
  ...installment,
  id: installment.id || installment._id,
  _id: installment._id || installment.id,
});

const findUserByEmail = (email) =>
  state.users.find((user) => user.email?.toLowerCase() === String(email).toLowerCase());

const findUserByPhone = (phone) => state.users.find((user) => user.phone === phone);

const findUserById = (id) => state.users.find((user) => user._id === id || user.id === id);

const createUser = (userData) => {
  const id = createId('user');
  const user = {
    _id: id,
    id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    role: userData.role || 'staff',
    isActive: userData.isActive !== false,
    password: userData.password,
  };
  state.users.push(user);
  return toPublicUser(user);
};

const updateUser = (id, updates) => {
  const user = findUserById(id);
  if (!user) return null;
  Object.assign(user, updates, {
    _id: user._id,
    id: user.id,
  });
  return toPublicUser(user);
};

const deleteUser = (id) => {
  const index = state.users.findIndex((user) => user._id === id || user.id === id);
  if (index === -1) return false;
  state.users.splice(index, 1);
  return true;
};

const listUsers = () =>
  state.users.map((user) => {
    const { password, ...rest } = toPublicUser(user);
    return rest;
  });

const listStaff = () =>
  listUsers().filter((user) => ["admin", "staff"].includes(user.role));

const findStaffById = (id) => {
  const user = findUserById(id);
  if (!user || !["admin", "staff"].includes(user.role)) return null;
  const { password, ...rest } = toPublicUser(user);
  return rest;
};

const listCustomers = () => state.customers.map(toPublicCustomer);

const findCustomerById = (id) => state.customers.find((customer) => customer._id === id || customer.id === id);

const createCustomer = (customerData) => {
  const id = createId('customer');
  const customer = {
    _id: id,
    id,
    fullName: customerData.fullName,
    phone: customerData.phone,
    alternatePhone: customerData.alternatePhone || null,
    aadhaar: customerData.aadhaar || null,
    address: customerData.address || {},
    kycDocumentType: customerData.kycDocumentType || 'Aadhaar',
    kycDocumentImage: customerData.kycDocumentImage || null,
    createdBy: customerData.createdBy,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  state.customers.push(customer);
  return toPublicCustomer(customer);
};

const updateCustomer = (id, updates) => {
  const customer = findCustomerById(id);
  if (!customer) return null;
  Object.assign(customer, updates, {
    _id: customer._id,
    id: customer.id,
    updatedAt: new Date().toISOString(),
  });
  return toPublicCustomer(customer);
};

const deleteCustomer = (id) => {
  const index = state.customers.findIndex((customer) => customer._id === id || customer.id === id);
  if (index === -1) return false;
  state.customers.splice(index, 1);
  return true;
};

const getInstallmentsForLoan = (loanId) =>
  state.installments.filter((item) => item.loanId === loanId);

const enrichLoan = (loan) => {
  const publicLoan = toPublicLoan(loan);
  const installments = getInstallmentsForLoan(publicLoan.id);
  const customer = findCustomerById(publicLoan.customerId);
  const paidEmis = installments.filter((item) => item.status === "Paid").length;
  const overdueEmis = installments.filter((item) => item.status === "Overdue").length;
  const outstandingBalance = installments
    .filter((item) => item.status !== "Paid")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const overdueAmount = installments
    .filter((item) => item.status === "Overdue")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return {
    ...publicLoan,
    customer,
    customerName: customer?.fullName,
    phone: customer?.phone,
    totalEmis: installments.length,
    paidEmis,
    overdueEmis,
    hasOverdue: overdueEmis > 0,
    overdueAmount: Number(overdueAmount.toFixed(2)),
    outstandingBalance: Number(outstandingBalance.toFixed(2)),
    status: outstandingBalance <= 0 ? "Completed" : overdueEmis > 0 ? "Overdue" : "Active",
  };
};

const listLoans = () => state.loans.map(enrichLoan);

const findLoanById = (id) => {
  const loan = state.loans.find((item) => item._id === id || item.id === id);
  return loan ? enrichLoan(loan) : null;
};

const createLoan = (loanData) => {
  const id = createId('loan');
  const loan = {
    _id: id,
    id,
    customerId: loanData.customerId,
    productName: loanData.productName,
    imeiNumber: loanData.imeiNumber,
    productPrice: loanData.productPrice,
    loginCharge: loanData.loginCharge,
    downPayment: loanData.downPayment,
    loanAmount: loanData.loanAmount,
    emiPlan: loanData.emiPlan,
    monthlyEmi: loanData.monthlyEmi,
    purchaseDate: loanData.purchaseDate,
    createdBy: loanData.createdBy,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  state.loans.push(loan);
  return toPublicLoan(loan);
};

const createInstallments = (loanId, customerId, plan, monthlyEmi, firstDueDate) => {
  const installments = Array.from({ length: plan }, (_, index) => {
    const dueDate = new Date(firstDueDate);
    dueDate.setMonth(dueDate.getMonth() + index);
    const id = createId('installment');
    const installment = {
      _id: id,
      id,
      loanId,
      customerId,
      emiNumber: index + 1,
      dueDate,
      amount: monthlyEmi,
      status: 'Pending',
      paidOn: null,
      collectedBy: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.installments.push(installment);
    return toPublicInstallment(installment);
  });
  return installments;
};

const listInstallmentsForLoan = (loanId) =>
  getInstallmentsForLoan(loanId).map((installment) => {
    const publicInstallment = toPublicInstallment(installment);
    const customer = findCustomerById(publicInstallment.customerId);
    const collector =
      publicInstallment.collectedBy && findUserById(publicInstallment.collectedBy);

    return {
      ...publicInstallment,
      customer,
      customerName: customer?.fullName,
      customerPhone: customer?.phone,
      collectedBy: collector
        ? {
            _id: collector._id,
            id: collector.id,
            name: collector.name,
            role: collector.role,
          }
        : publicInstallment.collectedBy,
    };
  });

const findInstallmentById = (id) => state.installments.find((item) => item._id === id || item.id === id);

const payInstallment = (id, userId, paymentMode) => {
  const installment = findInstallmentById(id);
  if (!installment) return null;
  installment.status = 'Paid';
  installment.paidOn = new Date().toISOString();
  installment.collectedBy = userId;
  installment.paymentMode = paymentMode || 'Cash';
  installment.updatedAt = new Date().toISOString();
  return toPublicInstallment(installment);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByPhone,
  findUserById,
  updateUser,
  deleteUser,
  listUsers,
  listStaff,
  findStaffById,
  listCustomers,
  findCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  listLoans,
  findLoanById,
  createLoan,
  createInstallments,
  listInstallmentsForLoan,
  findInstallmentById,
  payInstallment,
};
