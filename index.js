const Command = require('command');

module.exports = function SyncEmotes(dispatch) {	
    const command = Command(dispatch);
    
    let enabled = false,
    target = 0;
    
    command.add('sync', () => {
        enabled = !enabled;
        command.message('(sync-emotes) ' + (enabled === true ? 'Enabled' : 'Disabled');
    });

    dispatch.hook('C_SET_TARGET_INFO', 1, event => {
        target = event.target;
    })

    dispatch.hook('S_SOCIAL', 1, event => {
        if (enabled && event.target.equals(target)) {
            dispatch.toServer('C_SOCIAL', 1, {
                emote: event.animation,
                unk1: 0
            });
        }
    })
    
}