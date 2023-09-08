export const customStyles = {
  table: {
    style: {
      color: '#fff',
      backgroundColor: '#0000000',
    },
  },
  rows: {
      style: {
          minHeight: '72px',
          backgroundColor: '#0000000',
          color: '#fff',
          borderBottom: '1px solid #fff',
      },
      highlightOnHoverStyle: {
        backgroundColor: '#ffffff84',
        color: '#fff',      
      },
  },
  headRow: {
    style: {
      backgroundColor: '#0000000',
      color: '#fff',
      borderBottom: '1px solid #fff',
    },
  },
  headCells: {
      style: {
          paddingTop: '20px',
          paddingBottom: '15px',
          paddingLeft: '8px',
          paddingRight: '8px',
          backgroundColor: '#0000000',
          fontWeight: '700',
          color: '#fff',
          borderTop: '1px solid #fff'
      },
  },
  cells: {
      style: {           
          paddingTop: '11px',
          paddingBottom: '11px',
          paddingLeft: '8px',
          paddingRight: '8px',
          backgroundColor: '#0000000',
          color: '#fff',
          borderBottom: '1px solid #ffffff50',

      },
  },
  pagination: {
    style: {
      color: '#fff',
      backgroundColor: '#0000000'
    },
    pageButtonsStyle: {
      color: '#fff',
      fill: '#ffffff',
      backgroundColor: 'transparent',

    }
  },
  expanderRow: {
    style: {
      color: '#fff',
      backgroundColor: '#0000000'
    },
  },
  expanderButton: {
    style: {
      color: '#fff'
    },
  },
}

export const paginationComponentOptions = {
  noRowsPerPage: true,
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}  