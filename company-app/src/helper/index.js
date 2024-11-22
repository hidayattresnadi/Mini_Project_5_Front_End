import Swal from 'sweetalert2'
export function successSwal(message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: message
    })
}

export function failedSwal(error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        footer: '<a href="">Why do I have this issue?</a>'
    })
}

export function validateEmployee(employee) {
    const newErrors = {};

    if (!employee.employeeName) {
        newErrors.employeeName = 'Employee Name is required';
    }

    if(!employee.level) {
        newErrors.level = 'Level is required'
    }
    
    if (!employee.ssn) {
        newErrors.ssn = 'SSN is required';
    }
    
    if (!employee.address) {
        newErrors.address = 'Address is required';
    }
    
    if (!employee.sallary) {
        newErrors.sallary = 'Sallary is required';
    }

    if (!employee.sex) {
        newErrors.sex = 'Sex is required';
    }
    
    if (!employee.birthDate) {
        newErrors.birthDate = 'Date of Birth is required';
    }
    
    if (!employee.employmentType) {
        newErrors.employmentType = 'Employment Type is required';
    }
    
    if (!employee.phoneNumber) {
        newErrors.phoneNumber = 'Phone Number is required';
    }
    
    if (!employee.emailAddress) {
        newErrors.emailAddress = 'Email Address is required';
    }
    
    if (!employee.jobPosition) {
        newErrors.jobPosition = 'Job Position is required';
    }

    if(!employee.departmentId) {
        newErrors.departmentId = 'Please choose Department'
    }
    
    return newErrors;
};



export function validateDepartment(department) {
    const newErrors = {};

    if (!department.name) {
        newErrors.name = 'Department Name is required'
    }

    if (!department.mgrEmpNo) {
        newErrors.mgrEmpNo = 'Department Manager is required'
    }
    if (!department.number) {
        newErrors.number = 'Number is required'
    }

    return newErrors;
}

export function validateProject(project) {
    const newErrors = {};

    if (!project.projName) {
        newErrors.projName = 'Project Name is required'
    }

    if (!project.deptNo) {
        newErrors.deptNo = 'Department is required'
    }

    return newErrors;
}

export function validateWorksOn(worksOn){
    const newErrors = {};

    if (!worksOn.projNo) {
        newErrors.projNo = 'Project Number is required'
    }

    if (!worksOn.empNo) {
        newErrors.empNo = 'Employee Number is required'
    }

    if (!worksOn.dateWorked) {
        newErrors.dateWorked = 'Date Worked is required'
    }

    if (!worksOn.hoursWorked) {
        newErrors.hoursWorked = 'Hours Worked is required'
    }

    return newErrors;
}

const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    const lastDigit = day % 10;
    if (lastDigit === 1) return 'st';
    if (lastDigit === 2) return 'nd';
    if (lastDigit === 3) return 'rd';
    return 'th';
};

export const formatDateWithOrdinal = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const ordinal = getOrdinalSuffix(day);

    return `${month} ${day}${ordinal}, ${year}   ${hour}:${minute}`;
};




