import React, {useState} from 'react';
import {HIDDEN_COLUMN} from "../App";
import styled from "styled-components";
import EditButton from "../assets/Edit.svg"
import DeleteButton from "../assets/Delete.svg"
import AddButton from "../assets/Add.svg"
import CheckmarkButton from "../assets/Checkmark.svg"


const Title = styled.div`
  font-size: 20px;
  color: #2a2a2a;
  margin-top: 15px;
  margin-bottom: 10px;
`

const ActiveColumn = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 16px;
  width: 300px;
  grid-template-columns: 200px 50px 50px;
  height: 50px;
  border: 1px solid black;
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid black;
  }
`
const NotActiveColumn = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 200px 50px;
  width: 250px;
  height: 50px;
  border: 1px solid black;
  font-size: 16px;
  border-bottom: none;
  &:last-child {
    border-bottom: 1px solid black;
  }
`
const Image = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`
const EmptyData = styled.div`
  font-size: 16px;
  font-weight: bold;
`
const Input = styled.input`
  padding: 5px;
  font-size: 16px;
`

const WrapperEdit = ({mapEmployeesToActiveNameColumns, setMapEmployeesToActiveNameColumns}) => {

    return (
        <div>
            <ExistColumnList
                mapEmployeesToActiveNameColumns={mapEmployeesToActiveNameColumns}
                setMapEmployeesToActiveNameColumns={setMapEmployeesToActiveNameColumns}
            />
            <AddColumnList
                mapEmployeesToActiveNameColumns={mapEmployeesToActiveNameColumns}
                setMapEmployeesToActiveNameColumns={setMapEmployeesToActiveNameColumns}
            />
        </div>
    );
};
export default WrapperEdit;


const ExistColumnList = ({mapEmployeesToActiveNameColumns, setMapEmployeesToActiveNameColumns}) => {

    const [editModeByColumn, setEditModeByColumn] = useState(null);
    const [name, setName] = useState("");

    let activeColumns = [];
    mapEmployeesToActiveNameColumns.forEach(({value, key}) => {
        if (value !== HIDDEN_COLUMN) {
            activeColumns.push({key, value})
        }
    })

    const deleteColumn = (key) => () => {
        const newData = mapEmployeesToActiveNameColumns.map((elemObj) => {
            if (elemObj.key === key) {
                return {
                    key: key,
                    value: HIDDEN_COLUMN
                }
            }
            return elemObj;
        })
        setMapEmployeesToActiveNameColumns(newData);
    }

    const setEditMode = (key, value) => {
        setEditModeByColumn(key);
        setName(value)
    }

    const setNewName = (key) => {
        const newData = mapEmployeesToActiveNameColumns.map((elemObj) => {
            if (elemObj.key === key) {
                return {
                    key: key,
                    value: name
                }
            }
            return elemObj;
        })
        setMapEmployeesToActiveNameColumns(newData);

        setEditModeByColumn(null);
        setName('');
    }

    return <>
        <Title>Список колонок</Title>
        {activeColumns.length > 0 ? activeColumns.map(({key, value}, index) => {
            return <ActiveColumn key={`active--column-${index}`} style={{
                borderBottom: index === activeColumns.length - 1 && '1px solid black'
            }}>
                {key !== editModeByColumn ? value :
                    <Input
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                }
                {key !== editModeByColumn ? <Image
                    src={EditButton}
                    alt="editButton"
                    onClick={() => {
                        setEditMode(key, value)
                    }}
                /> : <Image
                    src={CheckmarkButton}
                    alt="checkmarkButton"
                    onClick={() => {
                        setNewName(key)
                    }}
                />}
                <Image
                    src={DeleteButton}
                    alt="deleteButton"
                    onClick={deleteColumn(key)}
                />
            </ActiveColumn>
        }) : <EmptyData>В таблице нет столбцов, добавьте их</EmptyData>}
    </>
}


const AddColumnList = ({mapEmployeesToActiveNameColumns, setMapEmployeesToActiveNameColumns}) => {

    let notActiveColumns = [];
    mapEmployeesToActiveNameColumns.forEach((columnObj) => {
        if (columnObj.value === HIDDEN_COLUMN) {
            notActiveColumns.push(columnObj.key);
        }
    })

    const addColumn = (key) => () => {
        const newData = mapEmployeesToActiveNameColumns.map((elemObj) => {
            if (elemObj.key === key) {
                return {
                    key: key,
                    value: key
                }
            }
            return elemObj;
        })
        setMapEmployeesToActiveNameColumns(newData);
    }

    return <>
        <Title>Добавить колонку</Title>
        {notActiveColumns.length > 0 ? notActiveColumns.map((columnName, index) => {
            return <NotActiveColumn key={`not-active--column-${index}`}>
                {columnName}
                <Image
                    src={AddButton}
                    alt="deleteButton"
                    onClick={addColumn(columnName)}
                />
            </NotActiveColumn>
        }) : <EmptyData>
            В таблицу выводятся все столбцы
        </EmptyData>}
    </>
}
