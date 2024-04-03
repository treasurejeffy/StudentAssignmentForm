const renderTables = () => {
    const tables = {};

    filteredDatas.forEach((item) => {
        const { id, ...workTypes } = item;

        Object.entries(workTypes).forEach(([assessmentType, work]) => {
            if (!tables[assessmentType]) {
                tables[assessmentType] = [];
            }
            tables[assessmentType].push({ id, work });
        });
        console.log(tables)
    });

    return Object.entries(tables).map(([assessmentType, data]) => {
        console.log(data)
        const tableData = data.reduce((acc, curr) => [...acc, ...curr.work], []);
        return (
            <div key={assessmentType}>
                <h2>{assessmentType}</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Reg No.</th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>SubmittedTime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((workItem, index) => (
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{workItem.Name}</td>
                                <td>{workItem.Link}</td>
                                <td>{workItem.submittedTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    });
};