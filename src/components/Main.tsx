import { Button, Group } from "@mantine/core";
import { notifications , Notifications} from '@mantine/notifications';
import IconCheck from '@tabler/icons-react/dist/esm/icons/IconCheck';

function Main() {
    const checkIcon = <IconCheck size={16} />
    return (
        <Group styles={{
            root: {
                backgroundColor: "#111111",
                width : "100vw",
                height : "100vh",
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
                flexDirection : "column",
                gap : "10px",
            }
        }}>
            <Notifications />
            <Button variant="gradient" color="blue" onClick={() => {
               notifications.show({
                title: 'Hello World',
                message: 'This is a notification',
                icon: checkIcon,
                color: "blue",
               })
            }}>Hello World</Button>
        </Group>
    )
}

export default Main;