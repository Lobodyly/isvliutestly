package com.yonyou.ucf.mdf.app.service.impl;


import com.yonyou.ucf.mdd.redis.factory.DaoFactory;
import com.yonyou.ucf.mdd.redis.interfaces.IRedisDao;
import com.yonyou.ucf.mdf.app.model.MetaInfoDto;
import com.yonyou.ucf.mdf.app.service.IEventService;
import org.imeta.core.cache.CacheEvictService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

//import static org.imeta.core.listener.ClientListener.DEPENDENCY;
//import static org.imeta.core.listener.ClientListener.UNIFIED_TEMP;

/**
 * <p>Title: EventServiceImpl</p>
 * <p>Description: 事件中心接口服务实现</p>
 *
 * @author zhanghbs
 * @date 2020-04-21 20:11
 * @Version 1.0
 */
@Service("EventServiceImpl")
public class EventServiceImpl  implements IEventService {
    private static final String UNIFIED_TEMP = "unified_temp";
    private static final String DEPENDENCY = "dependency";

    private IRedisDao redisDao = DaoFactory.getDao();

    @Override
    public Object updateMetaInfos(MetaInfoDto metaInfoDto) {
        String sourceID = metaInfoDto.getSourceID();
        String eventType = metaInfoDto.getEventType();
        /**
         * 业务处理
         */
        if("METACENTER".equals(sourceID)&&"META_ALTER".equals(eventType)){
            List<String> ids = metaInfoDto.getUserObject();
            String type = metaInfoDto.getType();
            String tenantId=metaInfoDto.getTenantId();
            if (Objects.isNull(tenantId)) {
                CacheEvictService.removeAllCache();
                removeMultiKeysById(type,ids);

            } else {
                removeMultiKeysByIdAndTenantId(type, tenantId, ids);
            }
        }
        Map<String, String> response = new HashMap<>();
        response.put("success", "true");
        return response;
    }
    private void removeMultiKeysByIdAndTenantId(String type, String tenantId, List<String> ids) {
        if (org.apache.commons.lang3.StringUtils.isAnyEmpty(type, tenantId)) {
            return;
        }

        ids.forEach(id -> {
            CacheEvictService.removeCacheByKey(getTempCacheKey(type, id, tenantId));
            CacheEvictService.removeCacheByKey(getTemCacheKeyWithDependency(type, id, tenantId));
            //删除redis缓存
            redisDao.del(getTempCacheKey(type, id, tenantId));
            redisDao.del(getTemCacheKeyWithDependency(type, id, tenantId));
        });
    }
    private void removeMultiKeysById(String type, List<String> ids) {
        if (org.apache.commons.lang3.StringUtils.isAnyEmpty(type)) {
            ids.forEach(id -> {

                CacheEvictService.removeCacheByKey(getTempCacheKey("entity", id));
                CacheEvictService.removeCacheByKey(getTemCacheKeyWithDependency("entity", id));
                //删除redis缓存
                redisDao.del(getTempCacheKey("entity", id));
                redisDao.del(getTemCacheKeyWithDependency("entity", id));

                CacheEvictService.removeCacheByKey(getTempCacheKey("component", id));
                CacheEvictService.removeCacheByKey(getTemCacheKeyWithDependency("component", id));
                //删除redis缓存
                redisDao.del(getTempCacheKey("component", id));
                redisDao.del(getTemCacheKeyWithDependency("component", id));

                CacheEvictService.removeCacheByKey(getTempCacheKey("interface", id));
                CacheEvictService.removeCacheByKey(getTemCacheKeyWithDependency("interface", id));
                //删除redis缓存
                redisDao.del(getTempCacheKey("interface", id));
                redisDao.del(getTemCacheKeyWithDependency("interface", id));

                CacheEvictService.removeCacheByKey(getTempCacheKey("enumeration", id));
                CacheEvictService.removeCacheByKey(getTemCacheKeyWithDependency("enumeration", id));
                //删除redis缓存
                redisDao.del(getTempCacheKey("enumeration", id));
                redisDao.del(getTemCacheKeyWithDependency("enumeration", id));

            });

        }

        ids.forEach(id -> {
            CacheEvictService.removeCacheByKey(getTempCacheKey(type, id));
            CacheEvictService.removeCacheByKey(getTemCacheKeyWithDependency(type, id));
            //删除redis缓存
            redisDao.del(getTempCacheKey(type, id));
            redisDao.del(getTemCacheKeyWithDependency(type, id));
        });
    }
    private String getTempCacheKey(String type, String id) {
        return String.format("%s:%s:%s", UNIFIED_TEMP, type, id);
    }

    private String getTempCacheKey(String type, String id, String tenantId) {
        return String.format("%s:%s:%s:%s", UNIFIED_TEMP, type, tenantId, id);
    }

    private String getTemCacheKeyWithDependency(String type, String id) {
        return String.format("%s:%s:%s:%s", UNIFIED_TEMP, type, id, DEPENDENCY);
    }

    private String getTemCacheKeyWithDependency(String type, String id, String tenantId) {
        return String.format("%s:%s:%s:%s:%s", UNIFIED_TEMP, type, tenantId, id, DEPENDENCY);
    }
}
