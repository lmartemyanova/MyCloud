import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <h2>404 - Страница не найдена</h2>
    <p>Похоже, вы перешли по несуществующему адресу.</p>
    <Link to="/">Вернуться на главную</Link>
  </div>
);

export default NotFoundPage;