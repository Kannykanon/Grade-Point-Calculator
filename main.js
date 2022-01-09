const add = document.querySelector("#add");
const courseCode = document.querySelector("#course-code");
const unitLoad = document.querySelector("#unit-load");
const grade = document.querySelector("#grade");
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector("#tfoot");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");

let gpArry = [];

add.addEventListener("click", () => {
  if (
    courseCode.value === "" ||
    unitLoad.value <= 0 ||
    grade.selectedIndex === 0
  ) {
    alert("Wrong input,check and try again");
  } else {
    const tr = document.createElement("tr");
    const tdCourseCode = document.createElement("td");
    tdCourseCode.innerHTML = courseCode.value;
    const tdUnitLoad = document.createElement("td");
    tdUnitLoad.innerHTML = unitLoad.value;
    const tdGrade = document.createElement("td");
    tdGrade.innerHTML = grade.options[grade.selectedIndex].text;
    tr.appendChild(tdCourseCode);
    tr.appendChild(tdUnitLoad);
    tr.appendChild(tdGrade);
    tbody.appendChild(tr);
    table.classList.remove("display-none");
    calcGp.classList.remove("display-none");
    clear.classList.remove("display-none");
    gpArry.push({
      unitLoad: unitLoad.value,
      grade: grade.options[grade.selectedIndex].value,
    });
    console.log(gpArry);
    courseCode.value = "";
    unitLoad.value = "";
    grade.selectedIndex = "0";
  }
});

calcGp.addEventListener("click", () => {
  let unitLoads = 0,
    productOfUnitLoadsAndGrades = 0,
    sumOfProductOfUnitLoadsAndGrades = 0;

  gpArry.forEach((result) => {
    unitLoads += parseInt(result.unitLoad);
    productOfUnitLoadsAndGrades =
      parseInt(result.unitLoad) * parseInt(result.grade);
    sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrades;
  });
  const tr = document.createElement("tr");

  tdTotalUnitLoad = document.createElement("td");
  tdTotalUnitLoad.innerHTML = `Your total unit load is ${unitLoads}`;

  tdGpa = document.createElement("td");
  tdGpa.setAttribute("colspan", "2");
  tdGpa.innerHTML = `Your GPA is ${(
    sumOfProductOfUnitLoadsAndGrades / unitLoads
  ).toFixed(2)} `;

  let GPA = (
    sumOfProductOfUnitLoadsAndGrades / unitLoads
  );
  
  // tdGpa.appendChild(tdRemark);
  tr.appendChild(tdTotalUnitLoad);
  tr.appendChild(tdGpa);
  const Remarktr = document.createElement("tr");
  tdRemark = document.createElement("td");
  if(GPA >= 4.50){
    tdRemark.innerHTML = `REMARK: FirstClass`;
  }
  else if(GPA >= 3.50 && GPA <= 4.49){
    tdRemark.innerHTML = `REMARK: SecondClass Upper`;
  }
  else if(GPA >= 2.40 && GPA <= 3.49){
    tdRemark.innerHTML = `REMARK: SecondClass Lower`;
  }
  else if(GPA >= 1.50 && GPA <= 2.39){
    tdRemark.innerHTML = `REMARK: ThirdClass`;
  }
  else if(GPA >= 1.00 && GPA <= 1.49){
    tdRemark.innerHTML = `REMARK: Pass`;
  }
  
  Remarktr.appendChild(tdRemark);
  
    if (tfoot.querySelector("tr") !== null) {
        tfoot.querySelector("tr").remove();
    }
  tfoot.appendChild(tr);
  tfoot.appendChild(Remarktr);
});

clear.addEventListener("click", () => {
  gpArry = [];
  tbody.querySelectorAll("*").forEach((child) => child.remove());
  if (tfoot.querySelector("tr") !== null) {
    tfoot.querySelector("tr").remove();
  }

  table.classList.add("display-none");
  calcGp.classList.add("display-none");
  clear.classList.add("display-none");
});
