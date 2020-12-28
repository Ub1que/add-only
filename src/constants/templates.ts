import { workspace } from 'vscode';

const defaultTemplates =  [
    {
        decline: ['skip'],
        insertAfterPriority: ['concurrent', 'test'],
        name: 'test'
    },
    {
        decline: ['skip'],
        insertAfterPriority: ['describe'],
        name: 'describe'
    }
]

export default function getTemplates(){
    const configTemplates = workspace.getConfiguration('AddOnly').templates

    return [...defaultTemplates, ...configTemplates];
}
