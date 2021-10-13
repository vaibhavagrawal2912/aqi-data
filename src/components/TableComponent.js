
function TableComponent({ data }) {
    console.log(data)
    return (
        <div className="table-component">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">City</th>
                        <th scope="col">AQI</th>
                        <th scope="col">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item, index) => (<tr key={index}>
                            <th>{item.city}</th>
                            <th className={item.class}>{item.aqi}</th>
                            <th>{item.timestamp}</th>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
