import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default function EditableField(props) {
    const { onItemizedItemEdit, cellData } = props;

    const handleChange = (e) => {
        // Preventing default form behavior (if any)
        e.preventDefault();
        onItemizedItemEdit(cellData.name, e.target.value, cellData.id);
    };

    return (
        <InputGroup className="my-1 flex-nowrap">
            {cellData.leading && (
                <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
                    <span
                        className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
                        style={{ width: "20px" }}
                    >
                        {cellData.leading}
                    </span>
                </InputGroup.Text>
            )}
            <FormControl
                type={cellData.type}
                name={cellData.name}
                value={cellData.value}
                placeholder={cellData.placeholder}
                min={cellData.min || ""}
                step={cellData.step || ""}
                onChange={handleChange}
                style={{
                    textAlign: cellData.textAlign || 'left',
                    width: '100%',
                    padding: '5px',
                    margin: '3px 0'
                }}
            />
        </InputGroup>
    );
}
