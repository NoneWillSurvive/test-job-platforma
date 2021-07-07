import React from 'react';
import DataGrid, {Column, ColumnFixing} from "devextreme-react/data-grid";
import {HIDDEN_COLUMN} from '../App';
import styled from "styled-components";

const EmptyTableMessage = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`

const Table = ({employees, mapEmployeesToActiveNameColumns}) => {

    const calculateCellValue = (data) => {
        return [data.Title, data.FirstName, data.LastName].join(' ');
    }

    const items = mapEmployeesToActiveNameColumns.map((elemObj, index) => {
        if (elemObj.value !== HIDDEN_COLUMN) {
            if (elemObj.key === 'Employee') {
                return <Column
                    key={`column-${index}-${elemObj.value}`}
                    caption={elemObj.value}
                    width={230}
                    fixed={true}
                    calculateCellValue={calculateCellValue}
                />
            }
            return <Column
                key={`column-${index}-${elemObj.value}`}
                alignment="center"
                caption={elemObj.value}
                dataField={elemObj.key}
            />;
        }
        return null;
    })

    const checkTableArray = items.filter((elem) => {
        return elem !== null;
    })
    if(checkTableArray.length === 0) {
        return <EmptyTableMessage>
            Таблица пустая, добавьте колонки
        </EmptyTableMessage>
    }

    return (
        <DataGrid
            id="gridContainer"
            dataSource={employees}
            keyExpr="ID"
            allowColumnReordering={true}
            allowColumnResizing={true}
            columnAutoWidth={true}
            showBorders={true}
        >
            <ColumnFixing enabled={true}/>
            {items}
        </DataGrid>
    );
};

export default Table;
