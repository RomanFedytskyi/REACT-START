import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Loader } from "rsuite";
import { getAllUsers, usersGetAllSelector } from "../store/usersSlice";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { data, isSuccess } = useSelector(usersGetAllSelector);

  return (
    <div>
      <div>{isSuccess ? "" : <Loader content="Loading..." />}</div>
      <div>
        <List hover>
          {data?.map((item, index) => (
            <List.Item key={item.id} index={index}>
              {item.name}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Users;
