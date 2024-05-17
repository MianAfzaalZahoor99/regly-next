const convertToCSV = (...data) => {
  const header = `${Object.keys(data[0]).join(',')  }\n`;
  
  const rows = data.map((row) => Object.values(row).join(',')).join('\n');
  return header + rows;
};

const downloadCSV = (csvData, filename) => {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const convert = (data, filename) => {
  const csvData = convertToCSV(data);
  downloadCSV(csvData, filename);
};

export default convert();
