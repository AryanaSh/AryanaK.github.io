document.addEventListener('DOMContentLoaded', (event) => {
    const runButton = document.getElementById('run-button');
    const popupModal = document.getElementById('popup-modal');
    const closePopup = document.getElementById('close-popup');

    runButton.addEventListener('click', () => {
        popupModal.style.display = 'block';
    });

    closePopup.addEventListener('click', () => {
        popupModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popupModal) {
            popupModal.style.display = 'none';
        }
    });

    // Set the 'home' content active by default when the page loads
    document.getElementById('home').classList.add('active');
    const tabsContainer = document.querySelector('.tabs');
    const contentPages = document.querySelectorAll('.content-page');

    const fileItems = document.querySelectorAll('.file');

    const openFile = (fileElement) => {
        const fileName = fileElement.textContent.trim(); // Get the text of the file (e.g., Main.html)
        const fileId = fileElement.getAttribute('data-file'); // Get the corresponding file ID

        const existingTab = document.querySelector(`.tab[data-file="${fileId}"]`);
        if (existingTab) {
            setActiveTab(existingTab);
            return;
        }

        const newTab = document.createElement('span');
        newTab.classList.add('tab');
        newTab.setAttribute('data-file', fileId);
        newTab.textContent = fileName; // Use the actual file name as the tab name
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.innerHTML = '&times;';
        newTab.appendChild(closeBtn);

        tabsContainer.appendChild(newTab);

        setActiveTab(newTab);
    };

    const setActiveTab = (tab) => {
        const file = tab.getAttribute('data-file');

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.content-page').forEach(page => page.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(file).classList.add('active');
    };

    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('close')) {
            const tab = e.target.parentElement;
            const file = tab.getAttribute('data-file');

            tab.remove();
            document.getElementById(file).classList.remove('active');

            const remainingTabs = document.querySelectorAll('.tab');
            if (remainingTabs.length > 0) {
                const nextTab = remainingTabs[0];
                setActiveTab(nextTab);
            } else {
                document.getElementById('home').classList.add('active');
            }
        } else if (e.target.classList.contains('tab')) {
            setActiveTab(e.target);
        }
    });

    fileItems.forEach(item => {
        item.addEventListener('click', (e) => {
            openFile(e.target);
        });
    });
});
