import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import { useLink } from '../services';

useGenerateLinkConfig.propTypes = {
  userId: propTypes.string,
  itemId: propTypes.string,
};

useGenerateLinkConfig.defaultProps = {
  userId: null,
  itemId: null,
};

// generates link configs in the link context.
// If not OAuth, token argument will be null and link context will call Plaid.linkTokenCreate to create a link token;
// If OAuth, link token from local storage is passed and used.

export default function useGenerateLinkConfig(isOauth, userId, itemId, token) {
  const [config, setConfig] = useState({ token: null, onSucces: null });
  const { generateLinkConfigs, linkConfigs } = useLink();

  // get link configs from link context
  useEffect(() => {
    generateLinkConfigs(isOauth, userId, itemId, token);
  }, [generateLinkConfigs, userId, itemId, token]);

  // set linkToken and callbacks from configs from link context
  useEffect(() => {
    if (linkConfigs.byUser[userId]) {
      setConfig(linkConfigs.byUser[userId]);
    }
    if (linkConfigs.byItem[itemId]) {
      setConfig(linkConfigs.byItem[itemId]);
    }
  }, [
    generateLinkConfigs,
    linkConfigs.byUser[userId],
    linkConfigs.byItem[itemId],
  ]);

  return config;
}