
const { merge } = require('mochawesome-merge');
const { create } = require('mochawesome-report-generator');

const mochaReportOptions = {
    reportFilename: 'integration-report',
    reportDir: 'cypress/reports/mochawsome',
    reportTitle: 'Utasks Testing Report',
    reportPageTitle: 'Utasks Report',
    inline: true,
    assetsDir: 'cypress/reports/mochawsome/assets',
    autoOpen: false,
    charts: true,
    showSkipped: true,
    showHooks: true,
};

async function generateReport(reportOptions) {
    const jsonReport = await merge({
        reportDir: "cypress/reports/mochawsome/json/report.json",
        files: ["cypress/reports/mochawsome/json/*.json"],
    });

    await create(jsonReport, reportOptions);
}

generateReport(mochaReportOptions);

