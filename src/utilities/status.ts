const getStatusIcon = (status?: Status) => {
  switch (status) {
    case 'reading':
      return 'book-outline';
    case 'sleeping':
      return 'bed-outline';
    case 'eating':
      return 'fast-food-outline';
    case 'traveling':
      return 'airplane-outline';
    case 'working_out':
      return 'barbell-outline';
    case 'music':
      return 'musical-notes-outline';
    default:
      return 'md-add-circle-outline';
  }
};

const getNextStatus = (status?: Status) => {
  switch (status) {
    case 'reading':
      return 'sleeping';
    case 'sleeping':
      return 'eating';
    case 'eating':
      return 'traveling';
    case 'traveling':
      return 'working_out';
    case 'working_out':
      return 'music';
    case 'music':
      return 'reading';
    default:
      return 'reading';
  }
};

export {getStatusIcon, getNextStatus};
