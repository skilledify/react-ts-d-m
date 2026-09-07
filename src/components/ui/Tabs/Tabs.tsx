import React, { useState, type ReactNode, type FC, type ReactElement } from "react";

// Интерфейсы для пропсов подкомпонентов
export interface TabButtonProps {
  tabId: string;
  label: ReactNode;
  children?: ReactNode;
}

export interface TabContentProps {
  tabId: string;
  children: ReactNode;
}

export interface TabsProps {
  children: ReactNode;
}

// Вспомогательный тип для Compound Component
interface TabsComponent extends FC<TabsProps> {
  Button: FC<TabButtonProps>;
  Content: FC<TabContentProps>;
}

export const Tabs: TabsComponent = ({ children }) => {
  // Преобразуем children в плоский массив валидных React-элементов
  const childArray = React.Children.toArray(children).filter(
    React.isValidElement
  );

  // Фильтруем подкомпоненты с безопасной типизацией
  const buttons = childArray.filter(
    (child): child is ReactElement<TabButtonProps> => child.type === Tabs.Button
  );

  const contents = childArray.filter(
    (child): child is ReactElement<TabContentProps> => child.type === Tabs.Content
  );

  const initialTab = buttons[0]?.props.tabId ?? "";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <div className="tabs">
      <div className="tabs__btn">
        {buttons.map((button) => {
          const { tabId, label } = button.props;
          const isActive = activeTab === tabId;

          return (
            <button
              key={tabId}
              type="button"
              className={`tabs__btn-item ${
                isActive ? "tabs__btn-item--active" : ""
              }`}
              onClick={() => setActiveTab(tabId)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="tabs__content">
        {contents.map((content) => {
          const { tabId, children: contentChildren } = content.props;
          if (tabId !== activeTab) return null;

          return (
            <div
              key={tabId}
              className="tabs__content-item tabs__content-item--active"
            >
              {contentChildren}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Подкомпоненты
Tabs.Button = ({ children }) => <>{children}</>;
Tabs.Content = ({ children }) => <>{children}</>;

export default Tabs;