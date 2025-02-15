import React from 'react';
import { Button, Table } from 'react-bootstrap';
import EditableField from './EditableField'; // Ensure it's imported correctly
import { BiTrash } from 'react-icons/bi';

export default function InvoiceItem(props) {
    const itemTable = props.items.map(item => (
        <ItemRow 
            onItemizedItemEdit={props.onItemizedItemEdit} 
            item={item} 
            key={item.id} 
            currency={props.currency} 
            onDelEvent={props.onRowDel} 
        />
    ));

    const handleRowAdd = (event) => {
        event.preventDefault();  // Prevent page refresh on "Add Item" button click
        props.onRowAdd();        // Call the passed function to add a new item
    };

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price/Rate</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {itemTable}
                </tbody>
            </Table>
            
           <Button 
           className="fw-bold"
           type="button"  // Prevents form submit behavior
           onClick={handleRowAdd}
       >
           Add Item
       </Button>
       
        </div>
    );
}

function ItemRow(props) {
    const onDelEvent = (event) => {
        event.preventDefault(); // Prevent default action (e.g., form submit or page refresh)
        props.onDelEvent(props.item.id);  // Pass only the id to delete the item
    };

    return (
        <tr>
            <td style={{ width: '100%' }}>
                <EditableField
                    onItemizedItemEdit={props.onItemizedItemEdit}
                    cellData={{
                        type: 'text',
                        name: 'name',
                        placeholder: 'Item Name',
                        value: props.item.name,
                        id: props.item.id
                    }}
                />
                <EditableField
                    onItemizedItemEdit={props.onItemizedItemEdit}
                    cellData={{
                        type: 'text',
                        name: 'description',
                        placeholder: 'Item Description',
                        value: props.item.description,
                        id: props.item.id
                    }}
                />
            </td>
            <td style={{ minWidth: '70px' }}>
                <EditableField
                    onItemizedItemEdit={props.onItemizedItemEdit}
                    cellData={{
                        type: 'number',
                        name: 'quantity',
                        min: 1,
                        step: '1',
                        value: props.item.quantity, 
                        id: props.item.id,
                    
                    }}
                />
                
            </td>
            <td style={{ minWidth: '130px' }}>
                <EditableField
                    onItemizedItemEdit={props.onItemizedItemEdit}
                    cellData={{
                        leading: props.currency, 
                        type: 'number',
                        name: 'price',
                        min: 1,
                        step: '0.01',
                        textAlign: 'text-end',
                        value: props.item.price,
                        id: props.item.id
                    }}
                />
            </td>
            <td className="text-center" style={{ minWidth: 50 }}>
                <BiTrash
                    onClick={onDelEvent}
                    style={{ height: '33px', width: '30px', padding: '7.5px' }}
                    className="text-white mt-1 btn btn-danger"
                />
            </td>
        </tr>
    );
}
