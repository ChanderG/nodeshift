'use strict';

const test = require('tape');

const labelEnricher = require('../../lib/resource-enrichers/labels-enricher');

const config = {
  projectName: 'Project Name',
  version: '1.0.0'
};

test('label enricher', (t) => {
  const resourceList = [
    {
      kind: 'Service',
      metadata: {
        name: 'service meta'
      }
    }
  ];

  const le = labelEnricher(config, resourceList);

  t.equal(typeof labelEnricher, 'function', 'is a function');
  t.equal(Array.isArray(le), true, 'should return an array');
  t.notEqual(le, resourceList, 'arrays should not be equal');
  t.ok(le[0].metadata.labels, 'label prop should be here');
  t.equal(le[0].metadata.labels.provider, 'nodeshift', 'provider is nodeshift');
  t.end();
});

test('label enricher - DeploymentConfig', (t) => {
  const resourceList = [
    {
      kind: 'DeploymentConfig',
      metadata: {
        name: 'deployment config meta'
      },
      spec: {
        template: {
          metadata: {
          }
        }
      }
    }
  ];

  const le = labelEnricher(config, resourceList);

  t.ok(le[0].spec.template.metadata.labels, 'should have a labels prop');
  t.equal(le[0].spec.template.metadata.labels.provider, 'nodeshift', 'should have a provider label of nodeshift');
  t.equal(le[0].spec.template.metadata.labels.app, config.projectName, `should have a app label ${config.projectName}`);
  t.end();
});
