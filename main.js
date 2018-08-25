let dataBase = [
  {
    name: 'Rimus',
    admission: 2000,
    deduction: 2005
  },
  {
    name: 'Mark',
    admission: 2001,
    deduction: 2006
  },
  {
    name: 'Irvin',
    admission: 1998,
    deduction: 1999
  },
  {
    name: 'Sam',
    admission: 2012,
    deduction: 2017
  },
  {
    name: 'Karl',
    admission: 2005,
    deduction: 2012
  },
  {
    name: 'Andrew',
    admission: 2018,
    deduction: 2018
  },
  {
    name: 'Dick',
    admission: 2007,
    deduction: 2010
  }
];

function getStudentsInTimeInterval(_admission, _deduction) {
  let studentsList = [];

  this.map(el => {
    if (el.admission >= _admission && el.deduction <= _deduction) {
      studentsList.push(el.name);
    }
  });

  return studentsList;
}

function getYearMaxStudents(from, to) {
  let studentsByYears = [];

  for (let start = from, j = 0; start <= to; start++) {
    var obj = {};
    obj.year = start;
    obj.studentCount = 0;
    studentsByYears.push(obj);

    for (let i = 0; i < this.length; i++) {
      if (isNumbIncludesRange(studentsByYears[j].year, this[i].admission, this[i].deduction)) {
        studentsByYears[j].studentCount += 1;
      }
    }
    j++
  }
  var maxObj = studentsByYears.reduce(function (prev, cur) {
    return cur.studentCount > prev.studentCount ? cur : prev;
  }, { studentCount: -Infinity });

  return maxObj.year;
}

function isNumbIncludesRange(numb, min, max) {
  if (numb >= min && numb <= max) {
    return true
  } else return false
}


console.log(getStudentsInTimeInterval.call(dataBase, 2000, 2010));
console.log(getYearMaxStudents.call(dataBase, 2000, 2010));