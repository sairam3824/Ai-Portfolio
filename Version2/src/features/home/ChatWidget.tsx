import { Link } from 'react-router-dom';
import SharedChatWidget from '../../../../shared-components/ChatWidget';

export default function ChatWidget() {
    return (
        <SharedChatWidget
            renderLink={({ to, className, children }) => (
                <Link to={to} className={className}>{children}</Link>
            )}
        />
    );
}
