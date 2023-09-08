import React from 'react'
import DataTable, { TableProps } from 'react-data-table-component'
import { ArrowDownRight } from 'react-feather';
import { customStyles, paginationComponentOptions } from './DatatableProps';

const sortIcon = <ArrowDownRight />;
//const selectProps = { indeterminate: (isIndeterminate: any) => isIndeterminate };

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
    return (
        <DataTable
            customStyles={customStyles}
            paginationComponentOptions={paginationComponentOptions}      
            pagination
            /* selectableRowsComponentProps={selectProps} */
            sortIcon={sortIcon}
            dense
            {...props}
        />
    );
}

export default DataTableBase;